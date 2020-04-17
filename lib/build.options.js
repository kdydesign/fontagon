const path = require('path')

/**
 * template
 * @returns {{css: *, scss: *, html: *}}
 */
function getTemplates () {
  const templateDir = path.join(__dirname, '..', 'lib/templates')

  return {
    css: path.join(templateDir, 'css.hbs'),
    scss: path.join(templateDir, 'scss.hbs'),
    html: path.join(templateDir, 'html.hbs')
  }
}

module.exports = {
  // basic options
  defaultOpts: {
    files: [],
    dist: 'dist/',
    writeFiles: true,
    fontName: 'fontagon-icons',
    css: true,
    cssTemplate: getTemplates().css,
    html: false,
    htmlTemplate: getTemplates().html,
    types: ['eot', 'woff', 'woff2'],
    order: ['eot', 'woff2', 'woff', 'ttf', 'svg'],
    rename (file) {
      return path.basename(file, path.extname(file))
    },
    formatOptions: {
      svg: {
        normalize: true,
        fontHeight: 1000
      }
    },
    startCodepoint: 0xF101,
    normalize: true,
    codepoints: {}
  },

  // class options
  classOptions: {
    baseClass: '.fontagon-icons',
    classPrefix: 'ft-'
  }
}
