function task_runner(program, path, options) {  
  options.fallback = path
  program.utils.doppler(options)
}


module.exports = function(program) {
  program
    .command("variables:download <path>")
    .description("download an environment's dotenv file")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .action(task_runner.bind(null, program));
}