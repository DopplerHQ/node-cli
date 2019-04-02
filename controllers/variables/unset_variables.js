function task_runner(program, name, options) {  
  variables = {}
  variables[name] = null
  
  program.api.variables.set_variables({
    variables: variables,
    environment: options.environment,
    pipeline: parseInt(options.pipeline)
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table(Object.keys(response.variables).map(function(name) {
        return {
          name: name,
          value: response.variables[name].raw,
          computed: response.variables[name].computed
        }
      }))
    }
  })
}


module.exports = function(program) {
  program
    .command("variables:unset <name>")
    .description("unset variable in environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(function(name, options) {
      task_runner(program, name, options)
    });
}