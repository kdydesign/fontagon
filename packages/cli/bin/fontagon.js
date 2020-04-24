const { program } = require('commander')
const chalk = require('chalk')

const cleanArgs = require('../utils/cleanArgs')

program
  .version(`fontagon-cli ${require('../package').version}`)
  .usage('<command> [options]')

program
  .command('generate <svg-path>')
  .description('build svg to create style sheet and font')
  .option('-s --style <style>, dsadsa')
  .action((svgPath, cmd) => {
    const options = cleanArgs(cmd)

    require('../lib/generate')(svgPath, options)
  })

// add some useful info on help
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
