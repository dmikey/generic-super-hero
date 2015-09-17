;(function(){
    var provider = new gsh.provider('genericAppProvider', function(){
        this.plugins = {};
        this.init = function(plugin) {
            this.plugins[plugin.name] = plugin.instance;
            //notify the plugin that the provider knows about it.
            plugin.instance.onRegister();
        };
        this.yield = function() {
            //the app notifies the provider when it is yielding
            for(var pluginName in this.plugins) {
                var plugin = this.plugins[pluginName];
                plugin.onControl();
            }
        };
        this.draw = function() {
            //the app notifies the provider when it is able to draw
            for(var pluginName in this.plugins) {
                var plugin = this.plugins[pluginName];
                plugin.onDraw();
            }
        };
    });
}());