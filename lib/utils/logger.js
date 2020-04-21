const consola = require('consola')
const { bgBlue, bgRed, cyan, red, blue } = require('chalk')

module.exports = {
  logger: consola.withScope('fontagon'),
  logColor: {
    bgBlue,
    bgRed,
    cyan,
    red,
    blue
  }
}
