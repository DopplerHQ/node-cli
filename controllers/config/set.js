const chalk = require("chalk")

function task_runner(program, name, value, options) {  
  const path = require("os").homedir() + "/.doppler"
  const config = program.utils.load_env(path) || {}
  config[name] = value
  program.utils.write_env(config, path)
  
  const keys = Object.keys(config)
  
  if(keys.length === 0) {
    return console.log(chalk.magenta(
      "You do not have any configs set. You can set a variable with the command:\n" +
      "doppler config:set <KEY> <VALUE>"
    ))
  }
  
  console.table(keys.map(function(name) {
    return {
      name,
      value: config[name]
    }
  }))
}


module.exports = function(program) {
  program
    .command("config:set <name> <value>")
    .description("set config variables")
    .action(task_runner.bind(null, program));
}