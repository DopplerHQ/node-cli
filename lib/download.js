const utils = require("./utils")
const Doppler = require("doppler-client")


function task_runner(program, filePath, options) {
  const doppler = utils.doppler(program)
  
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
      task_runner(program, argument, options)
    });
}