;(function(scope){

    //generate a fake guid
    function gid() {
       return '_' + Math.random().toString(36).substr(2, 9);
    };

    //generic life cycle events for all plugins
	var lifeCycle = {
        //when plugin is created
    	onCreate: null,
        //when plugin is destroyed
        onDestroy: null,
        //when plugin is offered a draw
        onDraw: null,
        //when plugin is yieled program control
        onControl: null
    };

    //our listing of plugins
    var plugins = {};

    //creating a plugin
    var plugin = function(pluginName, ctor, opts){
        //returns the plugin

        var plugin = plugins[pluginName];
        var provider = providers[opts.provider].instance;

        if(plugin) {
            console.warn('plugin sharing the same name found, skipping.');
         	return {};
        };

        plugins[pluginName] = {
            name: pluginName,
         	ctor: ctor,
            guid: gid(),
            instance: new ctor(provider)
        };

        //notify the plugin it was created
        plugins[pluginName].instance.onCreate();

        provider.init(plugins[pluginName]);

        this.plugin = plugins[pluginName];
    };

    //plugin providers that operate on plugins
    var providers = {};

    //register a new provider
  	var provider = function(providerName, ctor, opts){

        var provider =  providers[providerName];

        if(provider) {
            console.warn('plugin sharing the same name found, skipping.');
         	return {};
        };

        var readyStack = [];
        var init = function(stack) {
            for (i = 0; i < stack.length; i++) {
                stack[i]();
            }
        };
        ctor.prototype.domReady = function(func) {
            if (document.readyState === 'complete') {
                func();
            } else {
                readyStack.push(func);
            };
        };

        var readyStateCheckInterval = window.setInterval(function () {
            //attach a ready state listener to fire off our first updates when the dom is available
            if (document.readyState === 'complete') {
                window.clearInterval(readyStateCheckInterval);
                init(readyStack);
            }
        }, 10);

        providers[providerName] = {
            name: providerName,
         	ctor: ctor,
            guid: gid(),
            instance: new ctor()
        };

        this.provider = providers[providerName];
	};

    //gsh (generic super hero)
    //glue to manage plugins and provider de/register
    var gsh = function() {

        this.providers = providers;
        this.provider = function() {
           provider.apply(this, arguments);
        };

        this.plugins = plugins;
        this.plugin = function() {
           plugin.apply(this, arguments);
        };
    };

    window.gsh = window.gsh || new gsh();

}(window));