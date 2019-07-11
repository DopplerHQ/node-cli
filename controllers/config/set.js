const chalk = require("chalk")

function task_runner() {  
  const args = Array.from(arguments) 
  const program = args.splice(0, 1)[0]
  const options = args.splice(-1)[0]
  const path = require("os").homedir() + "/.doppler"
  const config = program.utils.load_env(path) || {}
 
  if(args.length == 0) {
    return options.help()
  }
  
  for(var i=0; i < args.length; i++) {
    const variable = args[i].split("=")
    config[variable[0]] = variable[1] || "" 
  }
 
  program.utils.write_env(config, path)
  
  const keys = Object.keys(config)
  
  if(keys.length === 0) {
    return console.log(chalk.magenta(
      "You do not have any configs set. You can set a variable with the command:\n" +
      "doppler config:set KEY_1=VALUE_1 KEY_2=VALUE_2 ..."
    ))
  }
  
  if(options.silent) { return } 
  
  console.table(keys.map(function(name) {
    return {
      name,
      value: config[name]
    }
  }))
}


module.exports = function(program) {
  program
    .command("config:set")
    .description("set config variables")
    .option("--silent", "do not print response", false)
    .action(task_runner.bind(null, program))
    .on('--help', function() {
      console.log('');
      console.log('Examples:');
      console.log('');
      console.log('  $ doppler config:set KEY=VALUE');
      console.log('  $ doppler config:set KEY_1=VALUE_1 KEY_2=VALUE_2 ...');
      console.log('');
    });
}