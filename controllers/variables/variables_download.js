function task_runner(program, path, options) {  
  program.utils.doppler(path)
}


module.exports = function(program) {
  program
    .command("variables:download <path>")
    .description("download an environment's dotenv file")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(function(path, options) {
      task_runner(program, path, options)
    });
}