function task_runner(program, stage, name, value, options) {  
  variables = {}
  variables[name] = value
  
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
    .command("stages:variables:set <id> <name> <value>")
    .description("set stage's default variables")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(stage, name, value, options) {
      task_runner(program, stage, name, value, options)
    });
}