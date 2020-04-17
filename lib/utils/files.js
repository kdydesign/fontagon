const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const { renderCss } = require('../renderer')

/**
 * writeFile
 *
 * @param content
 * @param dest
 */
export function writeFile (content, dest) {
  mkdirp.sync(path.dirname(dest))

  fs.writeFileSync(dest, content)
}

/**
 * writeReuslt
 *
 * @param fonts
 * @param options
 */
export function writeResult (fonts, options) {
  fonts.forEach((content, type) => {
    const filepath = path.join(options.dest, `${options.fontName}.${type}`)

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
