var expect = require('must');
var Styx = require('./../lib/styx');

describe("Styx", function () {
    it('can be constructed', function () {
        var styx = new Styx();
        var container = styx.create();
        expect(container).to.exist();
    });

    it('has only the container registered', function (done) {
        var styx = new Styx();

        styx.on('created',function(){
            expect(container.resolve('container')).to.equal(container);
            done();
        });

        var container = styx.create();
    });
});