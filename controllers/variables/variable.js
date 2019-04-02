function task_runner(program, argument, options) {  
  program.api.variables.variable({
    pipeline: parseInt(options.pipeline),
    environment: options.environment,
    name: argument
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table([{
        name: response.name,
        value: response.value.raw,
        computed: response.value.computed
      }])
    }
  })
}


module.exports = function(program) {
  program
    .command("variables:one <name>")
    .description("view specific variable in environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}