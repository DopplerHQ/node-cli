function task_runner(program, argument, options) {
  const doppler = program.utils.doppler(options)

  program.utils.runCommand(argument, {
    env: doppler.remote_keys
  })
}


module.exports = function(program) {

  program
    .command("run <COMMAND>")
    .alias("local")
    .description("run your app with variables from Doppler")
    .option("-f, --fallback <DOTENV FILEPATH>", "writes to this file on boot and read from it when you lose connection to the Doppler API.")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });

}
