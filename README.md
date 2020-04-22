# ☀ Fontagon
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]
![License][license-src]

> You can easily create web-icon-font by creating svg as font.

## Intro
This module easily converts svg to font files and css. 
It is a new and updated module that refers to [webfonts-generator](https://www.npmjs.com/package/webfonts-generator) and provides a variety of additional functions such as **css**, **less**, **sass**, and **stylus** conversion.


Features:
* Supported font formats: WOFF2, WOFF, EOT, TTF and SVG.
* Supports the product built with css, sass, less, and stylus.
* Custom templates are available.

## Infos
- [📖 **Release Notes**](./CHANGELOG.md)

## Install
Install with npm:

```bash
npm install fontagon
```

## Usage
```javascript
const Fontagon = require('fontagon')

Fontagon({
  files: [
    'path/**/*.svg'
  ],
  dist: 'dist/',
  fontName: 'fontagon-icons',
  style: 'all',
  classOptions: {
    baseClass: 'fontagon-icons',
    classPrefix: 'ft'
  }
}).then((opts) => {
  console.log('done! ' ,opts)
}).catch((err) => {
  console.log('fail! ', err)
})
```

## Options

### `files`
List of SVG files.

* Type: `Array`
* Default: `[]`
* *required*


### `dist`
Directory for generated font files.

* Type: `String`
* Default: `'dist/`


### `fontName`
Specify a font name and the default name for the font file.

* Type: `String`
* Default: `'fontagon-icons'`


### `style`
stylesheet file generation type.

* Type: `String`
* Default: `'all'`
* options: `'css', 'sass', 'less', 'stylus'`


### `styleTemplate`
Specify a custom style template.
<br>
The **'.hbs'** extension is required because the custom template is compiled through [handlebars](https://handlebarsjs.com/).
<br>
If the `style` is **'all'**, only one pre-processor template is specified in the `styleTemplate`, 
it is merged with the default option and processed.

* Type: `Object`
* Default: 
```json
{
  "styleTemplate": {
      "css": "css.hbs",
      "sass": "sass.hbs",
      "less": "less.hbs",
      "stylus": "styl.hbs"
  }
}
```


### `classOptions`
Additional options for CSS templates, that extends default options.
<br>
When **'baseClass'** is set, it is specified by the default class name of the stylesheet, 
or **'classPrefix'** as a sub class factor of the stylesheet.

* Type: `Object`
* Default: 
```json
{
    "baseClass": "fontagon-icons",
    "classPrefix": "ft"
  }
```


### `order`
Order of `src` values in `font-face` in CSS file.

* Type: `Array`
* Default: `['eot', 'woff2', 'woff', 'ttf', 'svg']`


### `rename`
Function that takes path of file and return name of icon.

* Type: `Function`
* Default: basename of file


### `startCodepoint`
Starting codepoint. Defaults to beginning of unicode private area.

* Type: `Number`
* Default: `0xF101`


### `codepoints`
Specific codepoints for certain icons.
<br>
Icons without codepoints will have codepoints incremented from `startCodepoint` skipping duplicates.

* Type: `Object`
* Default: `{}`


### `formatOptions`
Specific per format arbitrary options to pass to the generator

* Type: `object`
* Default:
```json
{
  "svg": {
    "normalize": true,
    "fontHeight": 1000
  }
}
```

format and matching generator:
- `svg` - [svgicons2svgfont](https://github.com/nfroidure/svgicons2svgfont).
- `ttf` - [svg2ttf](https://github.com/fontello/svg2ttf).
- `woff2` - [ttf2woff2](https://github.com/nfroidure/ttf2woff2).
- `woff` - [ttf2woff](https://github.com/fontello/ttf2woff).
- `eot` - [ttf2eot](https://github.com/fontello/ttf2eot).


### `writeFiles`
It is possible to not create files and get generated fonts in object to write them to files later.
<br>
Also results object will have function `generateCss([urls])` where `urls` is an object with future fonts urls.

* Type: `Boolean`
* Default: `true`


## License
[MIT License](./LICENSE)
Copyright (c) [Dev.DY](https://kdydesign.github.io/)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/fontagon?style=flat-square
[npm-version-href]: https://npmjs.com/package/fontagon
[npm-downloads-src]: https://img.shields.io/npm/dt/fontagon?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/fontagon
[circle-ci-src]: https://img.shields.io/circleci/project/github/kdydesign/fontagon/master.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/kdydesign/fontagon/tree/master
[codecov-src]: https://img.shields.io/codecov/c/github/kdydesign/fontagon.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/kdydesign/fontagon
[david-dm-src]: https://david-dm.org/kdydesign/fontagon/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/kdydesign/fontagon
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
[license-src]: https://img.shields.io/npm/l/fontagon?style=flat-square
