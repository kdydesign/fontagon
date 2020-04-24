const path = require('path')
const rimraf = require('rimraf')
const { logger } = require('./utils/logger')

module.exports = function buildClean (dist) {
  rimraf.sync(path.resolve(__dirname, `../${dist}/*`))
  logger.log('🚽 Cleaned build artifacts.\n')
}
