const utils = require("./utils")
const Doppler = require("doppler-client")


function task_runner(program, argument, options) {
  const doppler = utils.doppler(program, options.fallback)
  
  utils.runCommand(process.cwd(), argument, {
    env: doppler.remote_keys
  })
}


module.exports = function(program) {

  program
    .command("local <COMMAND>")
    .option("-d, --dotenv <DOTENV FILEPATH>", "pull local keys to track from your '.env' file", ".env")
    .option("-f, --fallback <DOTENV FILEPATH>", "writes to this file on boot and reads from it when you loose connection to the Doppler API.")
    .description("run your app locally")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
  
}
