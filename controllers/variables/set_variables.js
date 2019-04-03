function task_runner(program, name, value, options) {  
  const variables = {}
  variables[name] = value
  
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
          name,
          value: response.variables[name].raw,
          computed: response.variables[name].computed
        }
      }))
    }
  })
}


module.exports = function(program) {
  program
    .command("variables:set <name> <value>")
    .description("set variable in environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(function(name, value, options) {
      task_runner(program, name, value, options)
    });
}