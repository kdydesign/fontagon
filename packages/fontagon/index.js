/**
 * Fontagon
 *
 * Dev.DY <kdydesign@gmail.com>
 * issue: https://github.com/kdydesign/fontagon/issues
 *
 * MIT Lisence
 */

const path = require('path')
const _ = require('lodash')

const DefaultOptions = require('./renderer/defaultOptions')
const { writeResult, flattenFiles } = require('./utils/files')
const buildClean = require('./build/build.clear')
const { renderFonts } = require('./renderer')
const { name, version } = require('./package.json')

const { logger, logColor } = require('./utils/logger')

/**
 * initialize
 *
 * @param _opts
 * @returns {*}
 */
function initFontagon (_opts) {
  const optInc = new DefaultOptions()
  const options = Object.assign({}, optInc.defaultOpts(), _opts)

  // clean build
  buildClean(options)

  options.files = flattenFiles(options)
  options.names = _.map(options.files, options.rename)
  options.styleTemplate = Object.assign(optInc.defaultOpts().styleTemplate, options.styleTemplate)

  if (options.styleDist === void 0) {
    options.styleDist = path.join(options.dist, `${options.fontName}.${options.style}`)
  }

  if (options.htmlDist === void 0) {
    options.htmlDist = path.join(options.dist, `${options.fontName}.html`)
  }

  options.classOptions = Object.assign({}, optInc.classOptions(), options.classOptions)

  return options
}

/**
 * Create a new instance of Fontagon
 *
 * @param _opts
 * @returns {Promise<unknown>}
 * @constructor
 */
function Fontagon (_opts) {
  const options = initFontagon(_opts)

  logger(options.logs).log(`❤ Welcome to ${logColor.blue(name)} ${logColor.red(`v${version}`)}...\n`)

  if (options.files.length === 0) {
    return
  }

  const codepointsValues = _.values(options.codepoints)

  let currentCodepoint = options.startCodepoint

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

    logger(options.logs).log('\n💘 Build succeeded.')

    return options
  }).catch((err) => {
    logger(options.logs).log(err)
    logger(options.logs).log()
    logger(options.logs).log(logColor.red('💥 Build failed.'))

    return err
  })

  return new Promise(resolve => resolve(promiseResult))
}

module.exports = Fontagon
