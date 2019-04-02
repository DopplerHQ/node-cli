const chalk = require('chalk')

function task_runner(program, name, options) {  
  const path = require('os').homedir() + "/.doppler"
  const config = program.utils.load_env(path) || {}
  delete config[name]
  program.utils.write_env(config, path)
  
  const keys = Object.keys(config)
  
  if(keys.length == 0) {
    return console.log(chalk.magenta(
      "You do not have any configs set. You can set a variable with the command:\n" +
      "doppler config:set <KEY> <VALUE>"
    ))
  }
  
  console.table(keys.map(function(name) {
    return {
      name: name,
      value: config[name]
    }
  }))
}


module.exports = function(program) {
  program
    .command("config:unset <name>")
    .description("set config variables")
    .action(function(name, options) {
      task_runner(program, name, options)
    });
}