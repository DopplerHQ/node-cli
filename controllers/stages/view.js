function task_runner(program, stage, options) {  
  program.api.stages.view({
    stage,
    pipeline: parseInt(options.pipeline)
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table([response.stage])
    }
  })
}


module.exports = function(program) {
  program
    .command("stages:view <id or slug>")
    .description("stage information")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}