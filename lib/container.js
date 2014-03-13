var Installersniffer = require('./installersniffer');
var util = require('util');
var events = require('events');


function Container() {
    events.EventEmitter.call(this);
    var self = this;

    var registry = {};
    var installerSniffer = new Installersniffer(self);

    self.register = function (el, obj, opt) {
        if(opt && opt.isDefault)
            registry[el] = obj;
        else if(!registry.hasOwnProperty(el))
            registry[el] = obj;
    };

    self.install = function(){
        installerSniffer.registerInstallers();
    };

    self.resolve = function (el) {
        return registry[el];
    };

    self.resolveAll = function(regex){
        var results = [];
        Object.keys(registry).forEach(function(key){
            var match = key.match(regex);
            if(match)
                results.push(registry[key]);
        });

        return results;
    };

    installerSniffer.on('installed',function(){
        var installers = self.resolveAll(/(.+installer)$/);

        installers.forEach(function(installer){
            installer.install(self);
        });

        self.emit('installed');
    });

    installerSniffer.on('error',function(){
       self.emit('error');
    });

}

util.inherits(Container,events.EventEmitter);

module.exports = Container;