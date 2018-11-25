const utils = require("./utils")
const Doppler = require("doppler-client")


function taskRunner(program, filePath, options) {
  const credentials = utils.credentials(program)
  
  const doppler = new Doppler({
    api_key: credentials.api_key,
    pipeline: credentials.pipeline,
    environment: credentials.environment
  })
  
  if(options.htaccess) {
    utils.write_htaccess(doppler, filePath)
  } else {
    utils.write_env(doppler, filePath)
  } 
}


module.exports = function(program) {
  program
    .command("download <PATH>")
    .option("-h, --htaccess", "set output file type to .htaccess for php", false)
    .description("download an environment's dotenv file")
    .action(function(argument, options) {
      taskRunner(program, argument, options)
    });
}