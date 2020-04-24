const Fontagon = require('../index')

describe('module', () => {
  test('option', () => {
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
  })
})
