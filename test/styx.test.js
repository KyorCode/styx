var expect = require('chai').expect;
var styx = require('./../lib/styx');

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
});