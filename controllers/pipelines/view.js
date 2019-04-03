function task_runner(program, argument, options) {  
  program.api.pipelines.view({
    pipeline: argument
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
    .command("pipelines:view <id>")
    .description("pipeline information")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}