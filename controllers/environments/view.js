function task_runner(program, options) {  
  program.api.environments.view({
    environment: options.environment,
    pipeline: options.pipeline
  }).then(function(response) {    
    if(options.json) {    
      console.log(response)
    } else {
      console.table([response.environment]) 
    }
  })
}


module.exports = function(program) {
  program
    .command("environments:view")
    .description("environment information")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}