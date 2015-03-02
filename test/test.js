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
        assert.equal(imghdr.what(imgPath).length, 0);
    });
});

describe('#assert()', function() {

    it('`assert()` exist', function() {
        assert.equal(typeof imghdr.assert, 'function');
    });

    it('test `ext` with uppercase letter', function() {
        var imgPath = __dirname + '/imgtype/loading.gif';
        var ext = 'GIF';
        assert.ok(imghdr.assert(imgPath, ext));
    });
});

describe('#tests', function() {

    function testCustom(buf) {
        var sigBuf = new Buffer([0x6c, 0x6f, 0x76, 0x65]);
        var testSigBuf = buf.slice(2, 6);

        return (sigBuf.toString() == testSigBuf.toString()) ? ['custom'] : [];
    }

    it('test the list of functions performing the individual `tests`', function() {
        imghdr.tests.push(testCustom);
        var testBuf = new Buffer([0x49, 0x20, 0x6c, 0x6f, 0x76, 0x65, 0x20, 0x79, 0x6f, 0x75]);
        assert.ok(imghdr.assert(testBuf, 'custom'));
    });
});
