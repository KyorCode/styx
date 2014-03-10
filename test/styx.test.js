var expect = require('chai').expect;
var styx = require('./../lib/styx')

describe("Styx", function () {

    beforeEach(function () {
        debugger;
        this.container = styx.create();
    });

    it('can be constructed', function () {
        expect(this.container).to.exist;
    });

    it('has only the container registered', function () {
        expect(this.container.get('container')).to.equal(this.container);
    });

    it('can not register the same name twice', function () {
        this.container.register('container', {});
        expect(this.container.get('container')).to.equal(this.container);
    });

    it('can register the same name twice if isDefault is provided', function () {
        var obj = {};
        this.container.register('container', obj, { isDefault: true});
        expect(this.container.get('container')).to.equal(obj);
    });
});