![Fontagon logo](https://raw.githubusercontent.com/kdydesign/cdn/master/fontagon/logo/svg/fontagon-logo-inline.svg)

# Fontagon-CLI (Global)
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]
![License][license-src]

> Easily create web-icon-font svg using fontagon-cli

## Intro
This module easily converts svg to font files and css. 
It is a new and updated module that refers to [webfonts-generator](https://www.npmjs.com/package/webfonts-generator) and provides a variety of additional functions such as **css**, **less**, **sass**, and **stylus** conversion.


Features:
* Supported font formats: `WOFF2`, `WOFF`, `EOT`, `TTF` and `SVG`.
* Supports the product built with `css`, `sass`, `less`, and `stylus`.
* Custom templates are available.
* Support for `ligature`
* Support for `CLI`

## Infos
- [📖 **Release Notes**](./CHANGELOG.md)

## Install
Install with npm:

```bash
npm install -g fontagon-cli
```

You can check you have the right version with this command:
```bash
fontagon --version
```

## Usage
Create a file to build svg.
```bash
fontagon generate <svg-path> [options]
```

The `fontagon` create command has a number of options and you can explore them all by running:
```bash
fontagon generate --help
```

```bash
Usage: fontagon generate [options] <svg-path>

Build svg to create style sheets and fonts (multiple path inputs as ',')

Options:
  -s, --style <style>               Type of css or css pre-processor to export
  -t, --styleTemplate <path>        Path to a hbs template, requires --style
  -f, --fontName <font-name>        Specify a font name and the default name for the font file
  -d, --dist <dist>                 Directory for generated font files
  -b, --baseClass <base-class>      Stylesheet Default Class Name
  -p, --classPrefix <class-prefix>  Prefix of icon class name
  -h, --help                        display help for command
```

## License
[MIT License](./LICENSE)
Copyright (c) [Dev.DY](https://kdydesign.github.io/)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/fontagon-cli?style=flat-square
[npm-version-href]: https://npmjs.com/package/fontagon-cli
[npm-downloads-src]: https://img.shields.io/npm/dt/fontagon-cli?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/fontagon-cli
[circle-ci-src]: https://img.shields.io/circleci/project/github/kdydesign/fontagon/master.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/kdydesign/fontagon/tree/master
[codecov-src]: https://img.shields.io/codecov/c/github/kdydesign/fontagon.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/kdydesign/fontagon
[david-dm-src]: https://david-dm.org/kdydesign/fontagon/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/kdydesign/fontagon
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
[license-src]: https://img.shields.io/npm/l/fontagon?style=flat-square
