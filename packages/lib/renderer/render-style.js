/**
 * Render as style sheet
 */

const fs = require('fs')
const crypto = require('crypto')
const handlebars = require('handlebars')
const urlJoin = require('url-join')
const _ = require('lodash')

const { logger, logColor } = require('../utils/logger')

/**
 * creating hash
 *
 * @param options
 * @returns {string}
 */
function calcHash (options) {
  const hash = crypto.createHash('md5')

  options.files.forEach((file) => {
    hash.update(fs.readFileSync(file, 'utf8'))
  })

  hash.update(JSON.stringify(options))

  return hash.digest('hex')
}

/**
 * Create a font path for style sheet
 *
 * @param options
 * @param styleCode
 * @param urls
 * @returns {any}
 */
function makeSrc (options, styleCode, urls) {
  const templates = {
    eot: _.template('url("<%= url %>?#iefix") format("embedded-opentype")'),
    woff2: _.template('url("<%= url %>") format("woff2")'),
    woff: _.template('url("<%= url %>") format("woff")'),
    ttf: _.template('url("<%= url %>") format("truetype")'),
    svg: _.template('url("<%= url %>#<%= fontName %>") format("svg")')
  }

  const orderedTypes = _.filter(options.order, (type) => {
    return options.types.indexOf(type) !== -1
  })

  const src = _.map(orderedTypes, (type) => {
    return templates[type]({
      url: urls[type],
      fontName: options.fontName
    })
  })

  return styleCode === 'css'
    ? src.join(',\n')
    : src
}

/**
 * Create content codepoint
 *
 * @param options
 * @param styleCode
 * @param urls
 * @returns {*}
 */
function makeCtx (options, styleCode, urls) {
  let codepoints = {}

  _.forEach(options.codepoints, (a, b) => {
    codepoints = _.assignIn(codepoints, {
      [b]: a.toString(16)
    })
  })

  return _.assign({
    fontName: options.fontName,
    src: makeSrc(options, styleCode, urls),
    codepoints
  }, options.classOptions)
}

/**
 * makeUrls
 *
 * @param options
 * @returns {{}}
 */
function makeUrls (options) {
  const hash = calcHash(options)
  const baseUrl = options.cssFontsUrl && options.cssFontsUrl.replace(/\\/g, '/')
  const urls = _.map(options.types, (type) => {
    const fontName = `${options.fontName}.${type}?${hash}`

    return baseUrl
      ? urlJoin(baseUrl, fontName)
      : fontName
  })

  return _.zipObject(options.types, urls)
}

module.exports = function (options, styleCode) {
  const styleSheet = options.styleTemplate[styleCode]

  logger.log(`${logColor.bgBlue.black(`[BUILD: ${styleCode.toUpperCase()}]`)} Path of CSS template: ${logColor.cyan(styleSheet)}`)

  const ctx = makeCtx(options, styleCode, makeUrls(options))
  const source = fs.readFileSync(styleSheet, 'utf8')
  const template = handlebars.compile(source)

  return template(ctx)
}
