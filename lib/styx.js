var Container = require('./container');

module.exports = styx();

function styx() {
    var container = {};

    var create = function () {
        container = new Container();



        return container;
    };

    return {
        create : create
    }

};