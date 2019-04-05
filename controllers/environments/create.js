function task_runner(program, options) {    
  program.api.environments.create({
    name: options.name,
    pipeline: parseInt(options.pipeline),
    stage: options.stage,
    defaults: !options.blank
  }).then(function(response_environment) {
    return program.api.stages.view({
      pipeline: parseInt(options.pipeline),
      stage: response_environment.environment.stage
    }).then(function(response_stage) {
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
    .command("environments:create")
    .description("create a new pipeline")
    .option("-n, --name <name>", "name of pipeline")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-s, --stage <id or slug>", "stage id or slug")
    .option("-b, --blank", "do not populate with defaults variables")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}