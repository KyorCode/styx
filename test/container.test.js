var expect = require('chai').expect;
var Container = require('./../lib/container');

describe("Container", function () {

    beforeEach(function () {
        debugger;
        this.container = new Container();
    });

    describe("registration", function () {

        beforeEach(function(){
           this.container.register('container',this.container);
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
});