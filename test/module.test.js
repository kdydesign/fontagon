const fontagon = require('../lib')

describe('module', () => {
  test('option', () => {
    fontagon({
      files: [
        'src/assets/svg/host.svg',
        'src/assets/svg/host2.svg',
        'src/assets/svg/ma.svg',
        'src/assets/svg/ma2.svg',
        'src/assets/svg/ma3.svg',
        'src/assets/svg/network.svg'
      ],
      dest: 'dist/',
      fontName: 'secui-icons',
      cssTemplate: 'src/assets/templates/cssTemplate.hbs',
      classOptions: {
        classPrefix: 's-icon-',
        baseClass: '.secui-icons'
      },
      formatOptions: {
        svg: {
          normalize: true,
          fontHeight: 1000
        }
      }

    })
  })
})
