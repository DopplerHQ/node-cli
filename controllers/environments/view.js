function task_runner(program, argument, options) {  
  const query = {
    environment: argument,
    pipeline: parseInt(options.pipeline)
  }
  
  program.api.environments.view(query).then(function(response_environment) {
    query.stage = response_environment.environment.stage
    
    return program.api.stages.view(query).then(function(response_stage) {
      response_environment.environment.stage = response_stage.stage.slug
      return response_environment
    })
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
    .command("environments:view <name>")
    .description("environment information")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}