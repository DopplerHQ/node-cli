function task_runner(program, argument, options) {  
  const doppler = program.utils.doppler(options)
  
  program.utils.runCommand(argument, {
    env: doppler.remote_keys
  })
}


module.exports = function(program) {

  program
    .command("local <COMMAND>")
    .description("run your app locally")
    .option("-f, --fallback <DOTENV FILEPATH>", "writes to this file on boot and reads from it when you lose connection to the Doppler API.")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
  
}
