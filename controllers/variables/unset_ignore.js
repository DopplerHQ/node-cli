function task_runner(program, name, options) {  
  variables = {}
  variables[name] = false
  
  program.api.variables.set_ignore({
    names: variables,
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
    .command("variables:ignore:unset <name>")
    .description("unset variable to ignore in environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(function(name, options) {
      task_runner(program, name, options)
    });
}