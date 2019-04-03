function task_runner(program, stage, options) {  
  program.api.stages.variables({
    stage,
    pipeline: parseInt(options.pipeline)
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table(Object.keys(response.variables).map(function(name) {
        return {
          name,
          value: response.variables[name]
        }
      }))
    }
  })
}


module.exports = function(program) {
  program
    .command("stages:variables <id>")
    .description("stage's default variables")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}