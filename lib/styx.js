var Container = require('./container');

module.exports = styx();

function styx() {
    var container = {};

    var create = function (options) {
        container = new Container(options);

        container.register('container', container);
        container.install();

        return container;
    };

    return {
        create: create
    }

};