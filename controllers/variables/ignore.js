function task_runner(program, options) {  
  program.api.variables.variables({
    environment: options.environment,
    pipeline: parseInt(options.pipeline)
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table(response.ignore.map(function(name) {
        return {
          name
        }
      }))
    }
  })
}


module.exports = function(program) {
  program
    .command("variables:ignore")
    .description("view all ignored variables in environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}