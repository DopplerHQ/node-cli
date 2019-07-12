const chalk = require("chalk")

function task_runner(program, options) {
  const config = program.config.printable(options.all)

  if(config.length === 0) {
    return console.log(chalk.magenta(
      "You do not have any configs set. You can set a variable with the command:\n" +
      "doppler config:set <KEY> <VALUE>"
    ))
  }

  if(options.all) {
    console.log(chalk.yellow(
      "All variables are being shown, including ones out of scope.\n"
    ))
  } else {
    console.log(chalk.yellow(
      "Only scoped variables are being shown. Use the --all flag to see all variables.\n"
    ))
  }

  console.table(config)
}


module.exports = function(program) {
  program
    .command("config")
    .description("view config variables")
    .option("--all", "show all variables, even if they are out of scope", false)
    .action(task_runner.bind(null, program));
}