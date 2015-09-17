;(function(){
    var plugin = new gsh.plugin('genericPlugin', function(provider){



        this.onCreate = function(){

            //make sure the dom is ready before we touch it
            provider.domReady(function(){
                this.console = document.getElementById('console');
                this.console.innerHTML += 'generic plugin was created <br/>';
            }.bind(this));

        };

        this.onRegister = function() {

            provider.domReady(function(){
                this.console.innerHTML += 'my provider knows about me <br/>';
            }.bind(this));
        };

        this.onDestroy = function(){

        };

        this.onDraw = function(){

            provider.domReady(function(){
                this.console.innerHTML += 'safe for me to draw to screen <br/>';
            }.bind(this));
        };

        this.onControl = function(){

            provider.domReady(function(){
                this.console.innerHTML += 'i now have control <br/>';
            }.bind(this));
        };

    }, {provider:'genericAppProvider'});

}());