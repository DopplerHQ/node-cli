function task_runner(program, argument, options) {  
  program.api.pipelines.update({
    pipeline: argument,
    name: options.name,
    description: options.description
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
    .command("pipelines:update <id>")
    .description("update a pipeline")
    .option("-n, --name <name>", "name of pipeline")
    .option("-d, --description <description>", "description of pipeline")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    })
}