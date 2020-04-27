/**
 * Create font file and style sheet file
 */

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const glob = require('glob')
const mkdirp = require('mkdirp')

const { renderCss } = require('../renderer')

/**
 * Create File
 *
 * @param content
 * @param dist
 */
function writeFile (content, dist) {
  mkdirp.sync(path.dirname(dist))

  fs.writeFileSync(dist, content)
}

/**
 * creating style sheet file
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
 * Entry point for file generation
 *
 * @param fonts
 * @param options
 */
function writeResult (fonts, options) {
  _.forEach(fonts, (content, type) => {
    const filePath = path.join(options.dist, `${options.fontName}.${type}`)

    writeFile(content, filePath)
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
 * Process files from 'files'
 *
 * @param options
 * @returns {[]}
 */
function flattenFiles (options) {
  const files = []

  options.files.forEach((path) => {
    glob.sync(path).forEach(file => files.push(file))
  })

  return files
}

module.exports = {
  writeResult,
  flattenFiles
}
