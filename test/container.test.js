var expect = require('must');
var Container = require('./../lib/container');

describe("Container", function () {

    describe("registration", function () {

        beforeEach(function () {
            this.container = new Container();
            this.container.register('container', this.container);
        });

        it('can not register the same name twice', function () {
            this.container.register('container', {});
            expect(this.container.resolve('container')).to.equal(this.container);
        });

        it('can register the same name twice if isDefault is provided', function () {
            var obj = {};
            this.container.register('container', obj, { isDefault: true});
            expect(this.container.resolve('container')).to.equal(obj);
        });
    });

    describe("installation", function () {

        it("should have registered 1 installer", function (done) {
            var container = new Container();

            container.on('installed', function () {
                var installer = container.resolve('container.installer');
                expect(installer).to.exist();
                done();
            });

            container.install();
        });
    });

    describe("resolving", function () {

        beforeEach(function(){
            this.container = new Container();
        });

        describe(":one", function () {

            beforeEach(function () {
                this.subject = { it : 'super'};
                this.container.register('test.obj',this.subject);
            });

            it("can resolve a dependency", function () {
                var obj = this.container.resolve('test.obj');
                expect(obj).to.equal(this.subject);
            });
        });

        describe(":all", function () {

            beforeEach(function () {
                this.subject = { it : 'super'};
                this.container.register('test.obj',this.subject);

                this.subject2 = { it : 'awesome'};
                this.container.register('test.obj2',this.subject2);
            });

            it("can resolve multiple dependencies",function(){
                var result = this.container.resolveAll(/(test.+)$/);
                expect(result.length).to.equal(2);
            });
        });
    });
});