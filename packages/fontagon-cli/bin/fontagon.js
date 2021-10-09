#!/usr/bin/env node

const { program } = require('commander')
const { logger, logColor } = require('../utils/logger')

const cleanArgs = require('../utils/cleanArgs')
const { enhanceErrMsg, suggestCommands } = require('../utils/commanderUtil')

// info
program
  .version(`fontagon-cli ${require('../package').version}`)
  .usage('<command> [options]')

// generate
program
  .command('generate <svg-path>')
  .description('Build svg to create style sheets and fonts (multiple path inputs as \',\')')
  .option('-s, --style <style>', 'Type of css or css pre-processor to export')
  .option('-t, --styleTemplate <path>', 'Path to a hbs template, requires --style')
  .option('-f, --fontName <font-name>', 'Specify a font name and the default name for the font file')
  .option('-d, --dist <dist>', 'Directory for generated font files')
  .option('-b, --baseClass <base-class>', 'Stylesheet Default Class Name')
  .option('-p, --classPrefix <class-prefix>', 'Prefix of icon class name')
  .option('-l, --logs <log>', 'Log output')
  .action((svgPath, cmd) => {
    const options = cleanArgs(cmd)

    // If styleTemplate and style were defined, nest the styleTemplate value
    // into an object using the style value.
    if (options.styleTemplate) {
      if (options.style) {
        options.styleTemplate = { [options.style]: options.styleTemplate }
      } else delete options.styleTemplate
    }

    require('../lib/generate')(svgPath, options)
  })

// unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    logger().log('  ' + logColor.red(`Unknown command ${logColor.yellow(cmd)}.`))
    logger().log()

    suggestCommands(cmd)
  })

// --help
program.on('--help', () => {
  logger().log()
  logger().log(`  Run ${logColor.cyan('fontagon <command> --help')} for detailed usage of given command.`)
  logger().log()
})

program.addHelpCommand(false)

program.commands.forEach(c => c.on('--help', () => logger().log()))

enhanceErrMsg('missingArgument', (argName) => {
  return `Missing required argument ${logColor.yellow(`<${argName}>`)}.`
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
