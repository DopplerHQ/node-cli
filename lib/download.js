const utils = require("./utils")
const Doppler = require("doppler-client")


module.exports = function(program) {

  program
    .command('download <PATH>')
    .description("download an environment's dotenv file")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
  
}

function task_runner(program, filePath, options) {
  const credentials = utils.credentials(program)
  
  const doppler = new Doppler({
    api_key: credentials.api_key,
    pipeline: credentials.pipeline,
    environment: credentials.environment,
    backup_filepath: filePath
  })
}