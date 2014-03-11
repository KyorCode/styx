var expect = require('must');
var requireAll = require('./../lib/requireAll');

describe('requireAll',function(){

    beforeEach(function(){
       this.files = requireAll({
           dirname: __dirname + '/rFiles',
           filter : /(.+installer)\.js$/
       });
    });

    it('should have required one file',function(){
       expect(this.files).not.be.empty();
    });


    it('should have required the right file',function(){
       expect(this.files['test.installer']).to.be.eql({ index: 2, value: 10})
    });
});