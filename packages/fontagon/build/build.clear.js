const path = require('path')
const rimraf = require('rimraf')
const { logger } = require('../utils/logger')

module.exports = function buildClean (_opts) {
  rimraf.sync(path.join(_opts.dist, '*'))
  logger(_opts.logs).log('🚽 Cleaned build artifacts.\n')
}
