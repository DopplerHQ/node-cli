function task_runner(program, stage, name, options) {  
  variables = {}
  variables[name] = null
  
  program.api.stages.set_variables({
    stage: stage,
    variables: variables,
    pipeline: parseInt(options.pipeline)
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table(Object.keys(response.variables).map(function(name) {
        return {
          name: name,
          value: response.variables[name]
        }
      }))
    }
  })
}


module.exports = function(program) {
  program
    .command("stages:variables:unset <id> <name>")
    .description("unset stage's default variables")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(stage, name, options) {
      task_runner(program, stage, name, options)
    });
}