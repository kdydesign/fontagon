const Fontagon = require('fontagon')

function generate (svgPath, options) {
  return Fontagon({
    files: [svgPath],
    ...options
  })
}

module.exports = (...args) => {
  return generate(...args)
    .then((opts) => {
    })
    .catch((err) => {
      // stopSpinner(false) // do not persist
      //
      console.log(err)

      process.exit(1)
    })
}
