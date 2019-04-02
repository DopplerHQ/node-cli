function task_runner(program, argument, options) {
  program.api.environments.delete({
    pipeline: parseInt(options.pipeline),
    environment: argument,
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.log("Environment has been deleted.")
    }
  })
}


module.exports = function(program) {
  program
    .command("environments:delete <name>")
    .description("delete environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}