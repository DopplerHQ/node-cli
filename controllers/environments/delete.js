function task_runner(program, options) {
  program.api.environments.delete({
    pipeline: parseInt(options.pipeline),
    environment: options.environment
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.log("Environment has been deleted.")
    }
  })
}


module.exports = function(program) {
  program
    .command("environments:delete")
    .description("delete environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}