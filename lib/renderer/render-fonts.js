const fs = require('fs')
const Q = require('q')

const svgicons2svgfont = require('svgicons2svgfont')
const svg2ttf = require('svg2ttf')
const ttf2woff = require('ttf2woff')
const ttf2woff2 = require('ttf2woff2')
const ttf2eot = require('ttf2eot')

const generators = {
  svg: {
    fn: (options, done) => {
      let font = Buffer.alloc(0)
      let svgOptions = _.pick(options, ['fontName', 'fontHeight', 'descent', 'normalize', 'round'])

      if (options.formatOptions.svg) {
        svgOptions = _.assignIn(svgOptions, options.formatOptions.svg)
      }

      const fontStream = svgicons2svgfont(svgOptions)
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
      let font = svg2ttf(svgFont, options.formatOptions.ttf)
      font = Buffer.alloc(font.buffer)

      done(void 0, font)
    }
  },

  woff: {
    deps: ['ttf'],
    fn (options, ttfFont, done) {
      let font = ttf2woff(new Uint8Array(ttfFont), options.formatOptions.woff)

      font = Buffer.alloc(font.buffer)

      done(void 0, font)
    }
  },

  woff2: {
    deps: ['ttf'],
    fn (options, ttfFont, done) {
      let font = ttf2woff2(new Uint8Array(ttfFont), options.formatOptions.woff2)

      font = Buffer.alloc(font.buffer)

      done(void 0, font)
    }
  },

  eot: {
    deps: ['ttf'],
    fn (options, ttfFont, done) {
      let font = ttf2eot(new Uint8Array(ttfFont), options.formatOptions.eot)

      font = Buffer.alloc(font.buffer)

      done(void 0, font)
    }
  }
}

/**
 * renderFonts
 *
 * @param _opts
 * @returns {*|Promise<void>|PromiseLike<any>|Promise<any>}
 */
export default function (_opts) {
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

  return Q.all(_.values(genTasks))
    .then((results) => {
      return _.zipObject(_.keys(genTasks), results)
    })
}
