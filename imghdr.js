/*jshint camelcase:false, node:true */

/**
 * Recognize image file formats based on their first few bytes.
 */

 'use strict';

var fs = require('fs');

var tests = [];

exports.tests = tests;


exports.printTests = printTests;

// 兼容0.11.0以下的node版本
// fork from https://raw.githubusercontent.com/substack/node-buffer-equal/master/index.js
function bufferEqual(a, b) {
    if (!Buffer.isBuffer(a)) return undefined;
    if (!Buffer.isBuffer(b)) return undefined;
    if (typeof a.equals === 'function') return a.equals(b);
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};


/* Subroutines per image file type. */

// PNG Portable Network Graphics
function testPNG(buf) {
    var sigBuf = new Buffer([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    var len = sigBuf.length;
    var testSigBuf = buf.slice(0, len);

    return bufferEqual(testSigBuf, sigBuf) ? 'png' : false;
}

tests.push(testPNG);

// JPEG data in `JFIF` or `Exif` format
function testJPEG(buf) {
    var sigBuf = new Buffer([0xff, 0xd8, 0xff]);

    var len = sigBuf.length;
    var testSigBuf = buf.slice(0, len);

    // JPEG
    if (!bufferEqual(testSigBuf, sigBuf)) return false;

    testSigBuf = buf.slice(6, 10);

    // JFIF
    var sigBufJFIF = new Buffer([0x4a, 0x46, 0x49, 0x46]);
    if (bufferEqual(testSigBuf, sigBuf)) return 'jpeg';

    // Exif
    var sigBufExif = new Buffer([0x45, 0x78, 0x69, 0x66]);
    if (bufferEqual(testSigBuf, sigBuf)) return 'jpeg';

    return false;
}

tests.push(testJPEG);

// GIF (`GIF87a` and `GIF89a` variants)
function testGIF(buf) {
    var sigBufSet = [
        new Buffer([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]),
        new Buffer([0x47, 0x49, 0x46, 0x38, 0x37, 0x61]),
    ];

    for (var i = 0; i < sigBufSet.length; i++) {
        var sigBuf = sigBufSet[i];
        var len = sigBuf.length;
        var testSigBuf = buf.slice(0, len);
        if (bufferEqual(testSigBuf, sigBuf)) return 'gif';
    }

}

tests.push(testGIF);

/**
 * 测试图片的后缀名是否准确
 * @param imgPath 图片路径
 * @param ext 图片使用的后缀
 * @return 后缀名与图片的真实类型相同时返回true；否则，返回false。
 */
function checkImgExt(imgPath, ext) {
    // jpg和jpeg后缀虽不同，但表示同种图片类型
    if (ext === 'jpg') ext = 'jpeg';
    var imgBuf = fs.readSync(imgPath, {flag: 'r'});
    for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        if (typeof test === 'function' && test(imgBuf) === ext) {
            return true;
        }
    }

    return false;
}

exports.checkImgExt = checkImgExt;

/**
 * Recognize image headers
 * @param imgPath img file path
 * @return 获取图片文件的真实类型，如果无法识别则返回false。
 */
function what(imgPath) {
    var imgBuf = fs.readSync(imgPath, {flag: 'r'});
    for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        if (typeof test == 'function') {
            var type = tests[i](imgBuf);
            if (type) return type;
        }
    }

    return false;
}

exports.what = what;
