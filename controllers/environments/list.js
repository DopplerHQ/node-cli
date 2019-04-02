function task_runner(program, options) {
  const query = {
    pipeline: parseInt(options.pipeline)
  }
  
  program.api.stages.list(query).then(function(response) {
    const stages = response["stages"]
    var stages_dict = {}
    
    for(var i = 0; i < stages.length; i++) {
      const stage = stages[i]
      stages_dict[stage.id] = stage.slug
    } 
    return program.api.environments.list(query).then(function(response) {
      response.environments = response.environments.map(function(environment) {
        environment.stage = stages_dict[environment.stage]
        return environment
      })
      
      return response
    })
  }).then(function(response) {    
    if(options.json) {    
      console.log(response)
    } else {
      console.table(response.environments) 
    }
  })
}


module.exports = function(program) {
  program
    .command("environments")
    .description("list of environments in pipeline")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(argument) {
      task_runner(program, argument)
    });
}