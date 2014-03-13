var expect = require('must');
var InstallerSniffer = require('./../lib/installersniffer');
var Container = require('./../lib/container');

describe('Installersniffer', function () {
    it('should have registered 1 installer in the container', function (done) {

        var container = new Container();
        var installerSniffer = new InstallerSniffer(container,__dirname + '/rFiles');

        installerSniffer.on('installed', function () {
            var installer = container.get('test.installer');
            expect(installer).to.exist();
            done();
        });

        installerSniffer.install();
    });
});