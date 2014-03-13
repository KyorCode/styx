var Container = require('./container');
var events = require('events');
var utils = require('util');

var Styx = function () {
    events.EventEmitter.call(this);
    var self = this;

    var container = new Container();

    self.create = function () {
        container.install();
        return container;
    };

    container.on('installed',function(){
        self.emit('created');
    });
};

utils.inherits(Styx,events.EventEmitter);

module.exports = Styx;