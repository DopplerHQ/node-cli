function task_runner(program, options) {  
  program.api.pipelines.view({
    pipeline: parseInt(options.pipeline)
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table([response.pipeline]) 
    }
  })
}


module.exports = function(program) {
  program
    .command("pipelines:view")
    .description("pipeline information")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}