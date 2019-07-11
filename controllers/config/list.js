const chalk = require("chalk")

function task_runner(program, name, options) {  
  const config = program.config.printable()
  
  if(config.length === 0) {
    return console.log(chalk.magenta(
      "You do not have any configs set. You can set a variable with the command:\n" +
      "doppler config:set <KEY> <VALUE>"
    ))
  }
  
  console.table(config)
}


module.exports = function(program) {
  program
    .command("config")
    .description("view config variables")
    .action(task_runner.bind(null, program));
}