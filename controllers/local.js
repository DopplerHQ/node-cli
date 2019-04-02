function task_runner(program, argument, options) {  
  const doppler = program.utils.doppler(options.fallback)
  
  program.utils.runCommand(argument, {
    env: doppler.remote_keys
  })
}


module.exports = function(program) {

  program
    .command("local <COMMAND>")
    .option("-f, --fallback <DOTENV FILEPATH>", "writes to this file on boot and reads from it when you loose connection to the Doppler API.")
    .option("-p, --pipeline <ID>", "override pipeline from '.doppler' file")
    .option("-e, --environment <NAME>", "override environment from '.doppler' file")
    .description("run your app locally")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
  
}
