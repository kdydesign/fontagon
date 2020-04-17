const path = require('path')

const { defaultOpts, classOptions } = require('./default-opts')
const { writeResult } = require('./utils/files')
const { renderFonts, renderCss } = require('./renderer')

module.exports = function (_opts) {
  const options = Object.assign({}, defaultOpts, _opts)

  if (options.files.length === 0) {
    return
  }

  options.names = options.files.map(options.files, options.rename)

  if (options.cssDest === void 0) {
    options.cssDest = path.join(options.dest, `${options.fontName}.css`)
  }

  if (options.htmlDest === void 0) {
    options.htmlDest = path.join(options.dest, `${options.fontName}.html`)
  }

  options.templateOptions = Object.assign({}, classOptions, options.classOptions)

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

    // done(null, result)
    // eslint-disable-next-line handle-callback-err
  }).catch((err) => {
    // done(err)
  })
}
