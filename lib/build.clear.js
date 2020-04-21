const path = require('path')
const rimraf = require('rimraf')
const { logger } = require('./utils/logger')

export function buildClean (dist) {
  rimraf.sync(path.resolve(__dirname, `../${dist}/*`))
  logger.log('🚽 Cleaned build artifacts.\n')
}
