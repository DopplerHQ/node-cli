const chalk = require("chalk")
const path = require("path")

function task_runner() {
  const args = Array.from(arguments)
  const program = args.splice(0, 1)[0]
  const options = args.splice(-1)[0]
  const config = program.config.load()
  const scope = options.scope === "*" ? "*" : path.resolve(options.scope)

  if(args.length == 0) {
    options.outputHelp()
    process.exit(1)
  }

  const scoped_config = config[scope] || {}

  for(var i=0; i < args.length; i++) {
    delete scoped_config[args[i]]
  }

  config[scope] = scoped_config
  program.config.write(config)

  if(options.silent) { return }

  const printable = program.config.printable(true)

  if(printable.length === 0) {
    return console.log(chalk.magenta(
      "You do not have any configs set. You can set a variable with the command:\n" +
      "doppler config:set KEY_1=VALUE_1 KEY_2=VALUE_2 ..."
    ))
  }

  console.log(chalk.yellow(
    "All variables are being shown, including ones out of scope.\n"
  ))

  program.utils.tablePrint(printable)
}


module.exports = function(program) {
  program
    .command("config:unset")
    .description("set config variables")
    .option("--silent", "do not print response", false)
    .option("--scope <path>", "a directory path to scope the variables too.", "*")
    .action(task_runner.bind(null, program))
    .on('--help', function() {
      console.log('');
      console.log('Examples:');
      console.log('');
      console.log('  $ doppler config:unset KEY');
      console.log('  $ doppler config:unset KEY_1 KEY_2 ...');
      console.log('');
    });
}