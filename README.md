
## imghdr

 [![Build Status](https://api.travis-ci.org/meituan/imghdr.svg)](http://travis-ci.org/meituan/imghdr)
 [![NPM Version](http://img.shields.io/npm/v/imghdr.svg?style=flat)](https://www.npmjs.org/package/imghdr)
 [![NPM Downloads](https://img.shields.io/npm/dm/imghdr.svg?style=flat)](https://www.npmjs.org/package/imghdr)

> The `imghdr` module determines the type of image contained in a file or octet-streams(object of Buffer), inspired by Python's [imghdr](https://docs.python.org/3.4/library/imghdr.html) module.

The `imghdr` module defines the following function:
### imghdr.what(imgPath)
>Tests the image data contained in the file named by `imgPath`, and returns a string describing the image type. `imgPath` can be a object of [Buffer](http://nodejs.org/api/buffer.html).

|  Value |            Image format           |
|:------:|:---------------------------------:|
| "png"  | Portable Network Graphics         |
| "jpeg","jpg" | JPEG data in JFIF or Exif formats |
| "gif"  | GIF 87a and 89a Files             |
| "tiff" | Tagged Image File Format          |
| "bmp"  | BMP files                         |
| "webp" | WebP files                        |

You can extend the list of file types imghdr can recognize by appending to this variable:
### imghdr.tests
>A list of functions performing the individual tests. Each function takes a argument: the octet-streams(object of Buffer).The test function should return a string describing the image type if the test succeeded, or `flase` if it failed.

### Reference
- [http://www.filesignatures.net](http://www.filesignatures.net/index.php?page=all)
- http://www.garykessler.net/library/file_sigs.html
- https://docs.python.org/3.4/library/imghdr.html
