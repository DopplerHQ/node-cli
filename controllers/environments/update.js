function task_runner(program, options) {
  program.api.environments.update({
    environment: options.environment,
    pipeline: options.pipeline,
    name: options.name
  }).then(function(response) {
    if(options.json) {
      console.log(response)
    } else {
      program.utils.tablePrint([response.environment])
    }
  })
}


module.exports = function(program) {
  program
    .command("environments:update")
    .description("update a environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("-n, --name <name>", "name of environment")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}