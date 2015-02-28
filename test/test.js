/*jshint camelcase:false, node:true */

'use strict';

var assert = require('assert');

var imghdr = require('..');

var testImgSet = [
    {'path': __dirname + '/imgtype/dianying.bmp', type: 'bmp'},
    {'path': __dirname + '/imgtype/dianying.jpeg', type: 'jpeg'},
    {'path': __dirname + '/imgtype/ktv.tiff', type: 'tiff'},
    {'path': __dirname + '/imgtype/loading.gif', type: 'gif'},
    {'path': __dirname + '/imgtype/meishi.png', type: 'png'},
    {'path': __dirname + '/imgtype/novice_guide.jpg', type: 'jpeg'},
    {'path': __dirname + '/imgtype/__41241575__5113260.jpg.webp', type: 'webp'}
];


function testImg(imgPath, type) {
    var what = imghdr.what;

    it('test img file for `' + type + '`', function() {
        assert.notEqual(what(imgPath).indexOf(type), -1);
    });
}

describe('#what()', function() {

    it('`what()` exist', function() {
        assert.equal(typeof imghdr.what, 'function');
    });

    testImgSet.forEach(function(test) {
        testImg(test['path'], test['type']);
    });

    it('test error ext img', function() {
        var imgPath = __dirname + '/imgtype/sold_out.gif';
        var type = 'gif';
        assert.equal(imghdr.what(imgPath).indexOf(type), -1);
    });

    it('test empty file(i.e `touch empty.png`)', function() {
        var imgPath = __dirname + '/imgtype/empty.png';
        assert.ifError(imghdr.what(imgPath));
    });
});
