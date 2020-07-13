/**
 * command generate
 *
 * Dev.DY <kdydesign@gmail.com>
 * issue: https://github.com/kdydesign/fontagon/issues
 *
 * MIT Lisence
 */

const Fontagon = require('fontagon')
const { logger } = require('../utils/logger')

function generate (svgPath, opts) {
  const options = assignOpts(opts)

  return Fontagon({
    files: separatedSvg(svgPath),
    ...options
  })
}

/**
 * merge options
 *
 * @param opts
 * @returns {{}}
 */
function assignOpts (opts) {
  let options = {}

  for (const key in opts) {
    if (key === 'baseClass' || key === 'classPrefix') {
      options.classOptions = Object.assign({}, options.classOptions, {
        [key]: opts[key]
      })
    } else {
      options = Object.assign(options, {
        [key]: opts[key]
      })
    }
  }

  return options
}

/**
 * svg path separate
 *
 * @param path
 * @returns {unknown[]}
 */
function separatedSvg (path) {
  return path.split(',').filter(svg => svg !== '')
}

module.exports = (...args) => {
  return generate(...args)
    .then((opts) => {
      process.exit(1)
    })
    .catch((err) => {
      // stopSpinner(false) // do not persist
      //
      logger().log(err)

      process.exit(1)
    })
}
