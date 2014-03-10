module.exports = container

function container(opt) {

    var options = opt || {};

    var registry = {};

    var register = function (el, obj) {
        registry[el] = obj;
    };

    var install = function(){
        
    };

    var get = function (el) {
        return registry[el];
    };

    return {
        get: get,
        register: register,
        install : install
    };

};