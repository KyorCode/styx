var fs = require('fs');
var events = require('events');
var utils = require('util');

var Sniffer = function (options) {
    events.EventEmitter.call(this);
    var self = this;

    self.snif = function () {
        fs.readdir(options.dirname, function (err, files) {
            if (err){
                self.emit('error', err);
                return;
            }

            var count = files.length;

            files.forEach(function (file) {
                self.emit('pending', count);
                count--;
                var match = file.match(options.filter);
                if (!match) return;
                self.emit('file', match[1], options.dirname + '/' + file);
            });

            self.emit('pending',count);
        });
    };
};

utils.inherits(Sniffer, events.EventEmitter);

module.exports = Sniffer;