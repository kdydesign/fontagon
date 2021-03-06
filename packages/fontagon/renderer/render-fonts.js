/**
 * Create a font file with svg
 */

const fs = require('fs')
const Q = require('q')
const _ = require('lodash')

const SVGIcons2SVGFontStream = require('svgicons2svgfont')
const SVG2TTF = require('svg2ttf')
const TTF2WOFF = require('ttf2woff')
const TTF2WOFF2 = require('ttf2woff2')
const TTF2EOT = require('ttf2eot')

const { logger, logColor } = require('../utils/logger')

const generators = {
  svg: {
    fn: (options, done) => {
      let font = Buffer.alloc(0)
      let svgOptions = _.pick(options, ['fontName', 'fontHeight', 'descent', 'normalize', 'round'])

      if (options.formatOptions.svg) {
        svgOptions = _.assignIn(svgOptions, options.formatOptions.svg)
      }

      const fontStream = new SVGIcons2SVGFontStream(svgOptions)
        .on('data', (data) => {
          font = Buffer.concat([font, data])
        })
        .on('end', () => {
          done(void 0, font.toString())
        })

      options.files.forEach((file, idx) => {
        const glyph = fs.createReadStream(file)
        const name = options.names[idx]
        const unicode = String.fromCharCode(options.codepoints[name])

        let ligature = ''

        for (let i = 0; i < name.length; i++) {
          ligature += String.fromCharCode(name.charCodeAt(i))
        }

        glyph.metadata = {
          name,
          unicode: [unicode, ligature]
        }

        fontStream.write(glyph)
      })

      fontStream.end()
    }
  },

  ttf: {
    deps: ['svg'],
    fn: (options, svgFont, done) => {
      let font = SVG2TTF(svgFont, options.formatOptions.ttf)
      font = Buffer.from(font.buffer)

      done(void 0, font)
    }
  },

  woff: {
    deps: ['ttf'],
    fn: (options, ttfFont, done) => {
      let font = TTF2WOFF(new Uint8Array(ttfFont), options.formatOptions.woff)

      font = Buffer.from(font.buffer)

      done(void 0, font)
    }
  },

  woff2: {
    deps: ['ttf'],
    fn: (options, ttfFont, done) => {
      let font = TTF2WOFF2(new Uint8Array(ttfFont), options.formatOptions.woff2)

      font = Buffer.from(font.buffer)

      done(void 0, font)
    }
  },

  eot: {
    deps: ['ttf'],
    fn: (options, ttfFont, done) => {
      let font = TTF2EOT(new Uint8Array(ttfFont), options.formatOptions.eot)

      font = Buffer.from(font.buffer)

      done(void 0, font)
    }
  }
}

module.exports = function (_opts) {
  logger(_opts.logs).log(`${logColor.bgYellowBright.black('[BUILD: FONT]')} font name is ${logColor.cyan(_opts.fontName)}.`)

  const genTasks = {}

  const makeGenTask = (type) => {
    if (genTasks[type]) {
      return genTasks[type]
    }

    const gen = generators[type]
    const depsTasks = _.map(gen.deps, makeGenTask)

    const task = Q.all(depsTasks).then((depsFonts) => {
      const args = [_opts].concat(depsFonts)

      return Q.nfapply(gen.fn, args)
    })

    genTasks[type] = task
    return task
  }

  // Create all needed generate and write tasks.
  for (const i in _opts.types) {
    const type = _opts.types[i]

    makeGenTask(type)
  }

  return Q.all(_.values(genTasks)).then((results) => {
    return _.zipObject(_.keys(genTasks), results)
  }).catch((err) => {
    logger(_opts.logs).error(err)
  })
}
