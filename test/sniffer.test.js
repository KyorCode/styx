var expect = require('must');
var sinon = require('sinon');
var Sniffer = require('./../lib/sniffer');

describe('Sniffer', function () {

    describe('when all is well', function () {

        it('should have required one file', function (done) {
            var sniffer = new Sniffer({
                dirname: __dirname + '/rFiles',
                filter: /(.+installer)\.js$/
            });

            sniffer.on('file', function (file, filepath) {
                expect(filepath).to.exist();
                expect(file).to.exist();
                done();
            });

            sniffer.snif();
        });

        it('should emit the pending files twice', function (done) {
            var sniffer = new Sniffer({
                dirname: __dirname + '/rFiles',
                filter: /(.+installer)\.js$/
            });

            var spy = sinon.spy();

            sniffer.on('pending', spy);
            sniffer.snif();

            setTimeout(function () {
                sinon.assert.calledThrice(spy);
                done();
            },1000);
        });

        it('should have required the right file', function (done) {
            var sniffer = new Sniffer({
                dirname: __dirname + '/rFiles',
                filter: /(.+installer)\.js$/
            });

            sniffer.on('file', function (file, filepath) {
                expect(file).to.be.equal('test.installer');
                expect(filepath).to.be.equal(__dirname + '/rFiles/test.installer.js');
                done();
            });

            sniffer.snif();
        });
    });

    describe('when it does not go well', function () {
        it('should throw an error when dirname is not a directory', function (done) {
            var sniffer = new Sniffer({
                dirname: __dirname + '/rFiles/dontrequire.js',
                filter: /(.+installer)\.js$/
            });

            sniffer.on('error', function (err) {
                expect(err).to.throw();
                done();
            });

            sniffer.snif();
        });
    });
});