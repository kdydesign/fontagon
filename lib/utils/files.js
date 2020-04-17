const fs = require('fs')
const path = require('path')
const _ = require('lodash')
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
 * writeReuslt
 *
 * @param fonts
 * @param options
 */
export function writeResult (fonts, options) {
  _.forEach(fonts, (content, type) => {
    const filepath = path.join(options.dist, `${options.fontName}.${type}`)
    writeFile(content, filepath)
  })

  if (options.css) {
    const css = renderCss(options)

    writeFile(css, options.cssDest)
  }

  if (options.html) {
    // const html = renderHtml(options)
    //
    // writeFile(html, options.htmlDest)
  }
}
