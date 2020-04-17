const path = require('path')
const rimraf = require('rimraf')

export function buildClean (dist) {
  rimraf.sync(path.resolve(__dirname, `../${dist}/*`))
  console.log('🚽 Cleaned build artifacts.\n')
}
