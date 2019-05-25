function task_runner(program, options) {  
  program.api.stages.view({
    stage: options.stage,
    pipeline: options.pipeline
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
    .command("stages:view")
    .description("stage information")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-s, --stage <id or slug>", "stage id or slug")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}