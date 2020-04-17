const fontagon = require('../lib')

describe('module', () => {
  test('option', () => {
    fontagon({
      files: [
        'test/svg/svg-1.svg',
        'test/svg/svg-2.svg'
      ],
      fontName: 'secui-icons',
      formatOptions: {
        svg: {
          normalize: true,
          fontHeight: 1000
        }
      }

    })
  })
})
