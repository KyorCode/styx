module.exports = container;

function container(opt) {

    var options = opt || {};

    var registry = {};

    var register = function (el, obj, opt) {
        if(opt && opt.isDefault)
            registry[el] = obj;
        else if(!registry.hasOwnProperty(el))
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

}