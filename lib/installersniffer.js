var Sniffer = require('./sniffer');
var events = require('events');
var util = require('util');


var Installersniffer = function(container, dirname) {
    events.EventEmitter.call(this);

    var dir = dirname || __dirname + '/installers';
    var self = this;

    var sniffer = new Sniffer({
        dirname: dir,
        filter: /(.+installer)\.js$/
    });

    self.registerInstallers = function(){
      sniffer.snif();
    };

    sniffer.on('file', function (filename,filepath) {
        var requiredInstaller = require(filepath);
        container.register(filename, requiredInstaller);
    });

    sniffer.on('pending',function(count){
       if(count === 0)
        self.emit('installed');
    });

    sniffer.on('error',function(err){
       self.emit('error',err);
    });
};

util.inherits(Installersniffer,events.EventEmitter);

module.exports = Installersniffer;