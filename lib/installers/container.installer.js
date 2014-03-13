var Installer = function(){
   var self = this;

    self.install = function(container){
        container.register('container',container);
    };
};

module.exports = new Installer();