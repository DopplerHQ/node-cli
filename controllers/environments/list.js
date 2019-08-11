function task_runner(program, options) {
  program.api.environments.list({
    pipeline: options.pipeline
  }).then(function(response) {
    if(options.json) {
      console.log(response)
    } else {
      program.utils.scrollTablePrint("Environments", response.environments)
    }
  })
}


module.exports = function(program) {
  program
    .command("environments")
    .description("list of environments in pipeline")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}