const path = require('path')
const _ = require('lodash')

const { red, blue } = require('chalk')
const { defaultOpts, classOptions } = require('./build.options')
const { writeResult } = require('./utils/files')
const { buildClean } = require('./build.clear')
const { renderFonts, renderCss } = require('./renderer')
const { name, version } = require('../package.json')

console.log(`❤ Welcome to ${blue(name)} ${red(`v${version}`)}...\n`)

module.exports = function (_opts) {
  const options = Object.assign({}, defaultOpts, _opts)

  if (options.files.length === 0) {
    return
  }

  buildClean(options.dist)

  options.names = _.map(options.files, options.rename)

  if (options.cssDest === void 0) {
    options.cssDest = path.join(options.dist, `${options.fontName}.css`)
  }

  if (options.htmlDest === void 0) {
    options.htmlDest = path.join(options.dist, `${options.fontName}.html`)
  }

  options.classOptions = Object.assign({}, classOptions, options.classOptions)

  let currentCodepoint = options.startCodepoint

  const codepointsValues = _.values(options.codepoints)

  function getNextCodepoint () {
    while (_.includes(codepointsValues, currentCodepoint)) {
      currentCodepoint++
    }

    const res = currentCodepoint

    currentCodepoint++

    return res
  }

  options.names.forEach((name) => {
    if (!options.codepoints[name]) {
      options.codepoints[name] = getNextCodepoint()
    }
  })

  renderFonts(options).then((result) => {
    if (options.writeFiles) {
      writeResult(result, options)
    }

    result.generateCss = (urls) => {
      return renderCss(options, urls)
    }

    console.log('💘 Build succeeded.')
    // done(null, result)
  }).catch((err) => {
    console.log('💥 Build failed.')
    console.log(err)
    // done(err)
  })
}
