/**
 * fontagon default option
 */

const path = require('path')

/**
 * Default Template Options
 *
 * @returns {{css: *, scss: *, html: *}}
 */
function getTemplates () {
  const templateDir = path.join(__dirname, '..', 'templates')

  return {
    css: path.join(templateDir, 'css.hbs'),
    sass: path.join(templateDir, 'sass.hbs'),
    less: path.join(templateDir, 'less.hbs'),
    stylus: path.join(templateDir, 'styl.hbs'),
    html: path.join(templateDir, 'html.hbs')
  }
}

class Options {
  defaultOpts () {
    return {
      files: [],
      dist: 'dist/',
      writeFiles: true,
      fontName: 'fontagon-icons',
      style: 'all',
      styleTemplate: getTemplates(),
      html: false,
      htmlTemplate: getTemplates().html,
      types: ['eot', 'woff', 'woff2'],
      order: ['eot', 'woff2', 'woff', 'ttf', 'svg'],
      rename (file) {
        return path.basename(file, path.extname(file))
      },
      logs: true,
      formatOptions: {
        svg: {
          normalize: true,
          fontHeight: 1000
        }
      },
      startCodepoint: 0xF101,
      normalize: true,
      codepoints: {}
    }
  }

  classOptions () {
    return {
      baseClass: 'fontagon-icons',
      classPrefix: 'ft'
    }
  }
}

module.exports = Options
