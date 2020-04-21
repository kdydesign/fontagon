const Fontagon = require('../../lib/index.js')

Fontagon({
  files: [
    'test/**/*.svg'
  ],
  dist: 'dist/',
  fontName: 'fontagon-icons',
  style: 'all',
  classOptions: {
    baseClass: 'fontagon-icons',
    classPrefix: 'ft'
  }
}).then((opts) => {
  console.log('done! ')
}).catch((err) => {
  console.log('fail! ', err)
})
