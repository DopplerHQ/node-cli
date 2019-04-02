function task_runner(program, argument, options) {  
  program.api.stages.variable({
    stage: argument,
    pipeline: parseInt(options.pipeline),
    name: options.name
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table([{
        name: response.name,
        value: response.value
      }])
    }
  })
}


module.exports = function(program) {
  program
    .command("stages:variable <id>")
    .description("stage's specific default variable")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-n, --name <string>", "name of variable")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}