const path = require('path')
const _ = require('lodash')

const { defaultOpts, classOptions } = require('./build.options')
const { writeResult, flattenFiles } = require('./utils/files')
const { buildClean } = require('./build.clear')
const { renderFonts } = require('./renderer')
const { name, version } = require('../package.json')

const { logger, logColor } = require('./utils/logger')

logger.log(`❤ Welcome to ${logColor.blue(name)} ${logColor.red(`v${version}`)}...\n`)

module.exports = function (_opts) {
  const options = Object.assign({}, defaultOpts, _opts)

  if (options.files.length === 0) {
    return
  }

  // clean build
  buildClean(options.dist)

  options.files = flattenFiles(options)
  options.names = _.map(options.files, options.rename)

  if (options.styleDist === void 0) {
    options.styleDist = path.join(options.dist, `${options.fontName}.${options.style}`)
  }

  if (options.htmlDist === void 0) {
    options.htmlDist = path.join(options.dist, `${options.fontName}.html`)
  }

  options.classOptions = Object.assign({}, classOptions, options.classOptions)

  let currentCodepoint = options.startCodepoint

  const codepointsValues = _.values(options.codepoints)

  const getNextCodepoint = () => {
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

  const promiseResult = renderFonts(options).then((result) => {
    if (options.writeFiles) {
      writeResult(result, options)
    }

    logger.log('\n💘 Build succeeded.')

    return options
  }).catch((err) => {
    logger.log('💥 Build failed.')

    return err
  })

  return new Promise(resolve => resolve(promiseResult))
}
