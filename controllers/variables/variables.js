function task_runner(program, options) {  
  program.api.variables.variables({
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
    .command("variables")
    .description("view all variables in environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(function(options) {
      task_runner(program, options)
    });
}