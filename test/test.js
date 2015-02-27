/*jshint camelcase:false, node:true */

'use strict';

var assert = require('assert');

var imghdr = require('..');

var testImgSet = [
    {'path': __dirname + '/imgtype/meishi.png', type: 'png'},
    {'path': __dirname + '/imgtype/novice_guide.jpg', type: 'jpeg'},
    //{'path': __dirname + '/imgtype/', type: 'jpeg'},
    {'path': __dirname + '/imgtype/loading.gif', type: 'gif'}
];


function testImg(imgPath, type) {
    var what = imghdr.what;

    it('test img file for `' + type + '`', function() {
        assert.equal(what(imgPath), type);
    });
}

describe('#what()', function(){

    it('`what()` exist', function() {
        assert.equal(typeof imghdr.what, 'function');
    });

    testImgSet.forEach(function(test) {
        testImg(test['path'], test['type']);
    });
});
