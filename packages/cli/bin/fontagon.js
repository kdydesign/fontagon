#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const leven = require('leven')

const cleanArgs = require('../utils/cleanArgs')

// info
program
  .version(`fontagon-cli ${require('../package').version}`)
  .usage('<command> [options]')

// generate
program
  .command('generate <svg-path>')
  .description('Build svg to create style sheets and fonts (multiple path inputs as \',\')')
  .option('-s, --style <style>', 'Type of css or css pre-processor to export')
  .option('-f, --fontName <font-name>', 'Specify a font name and the default name for the font file')
  .option('-d, --dist <dist>', 'Directory for generated font files')
  .option('-b, --baseClass <base-class>', 'Stylesheet Default Class Name')
  .option('-p, --classPrefix <class-prefix>', 'Prefix of icon class name')
  .action((svgPath, cmd) => {
    const options = cleanArgs(cmd)

    require('../lib/generate')(svgPath, options)
  })

// unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log('  ' + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
  })

// --help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan('fontagon <command> --help')} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function suggestCommands (unknownCommand) {
  const availableCommands = program.commands.map(cmd => cmd._name)

  let suggestion

  availableCommands.forEach((cmd) => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd
    }
  })

  if (suggestion) {
    console.log('  ' + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}
