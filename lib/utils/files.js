const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const glob = require('glob')
const mkdirp = require('mkdirp')

const { renderCss } = require('../renderer')

/**
 * writeFile
 *
 * @param content
 * @param dest
 */
function writeFile (content, dist) {
  mkdirp.sync(path.dirname(dist))

  fs.writeFileSync(dist, content)
}

/**
 * writeStyle
 *
 * @param options
 */
function writeStyle (options) {
  let styleType = [].concat(options.style)

  if (options.style === 'all') {
    styleType = ['css', 'sass', 'less', 'stylus']
  }

  styleType.forEach((styleCode) => {
    const css = renderCss(options, styleCode)
    const templateCode = styleCode === 'stylus' ? 'styl' : styleCode
    const styleDist = path.join(options.dist, `${options.fontName}.${templateCode}`)

    writeFile(css, styleDist)
  })
}

/**
 * writeResult
 *
 * @param fonts
 * @param options
 */
export function writeResult (fonts, options) {
  _.forEach(fonts, (content, type) => {
    const filepath = path.join(options.dist, `${options.fontName}.${type}`)

    writeFile(content, filepath)
  })

  if (options.style) {
    writeStyle(options)
  }

  if (options.html) {
    // const html = renderHtml(options)
    //
    // writeFile(html, options.htmlDist)
  }
}

/**
 * flattenFiles
 *
 * @param options
 * @returns {[]}
 */
export function flattenFiles (options) {
  const files = []

  options.files.forEach((path) => {
    glob.sync(path).forEach(file => files.push(file))
  })

  return files
}
