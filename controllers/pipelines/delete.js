function task_runner(program, argument, options) {
  program.api.pipelines.delete({
    pipeline: argument
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.log("Pipeline has been deleted.")
    }
  })
}


module.exports = function(program) {
  program
    .command("pipelines:delete <id>")
    .description("delete the pipeline")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}