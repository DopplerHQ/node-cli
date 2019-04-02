function task_runner(program, filePath, options) {
  const doppler = program.utils.doppler()
  program.utils.write_env(doppler, filePath) 
}


module.exports = function(program) {
  program
    .command("download <PATH>")
    .description("download an environment's dotenv file")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}