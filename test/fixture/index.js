const Fontagon = require('../../lib/index.js')

Fontagon({
  files: [
    'test/**/*.svg'
  ],
  dist: 'dist/',
  fontName: 'fontagon-icons',
  styleTemplate: {
    css: 'test/fixture/custom-templates/custom-template.hbs'
  },
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
