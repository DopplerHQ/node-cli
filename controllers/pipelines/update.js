function task_runner(program, options) {
  program.api.pipelines.update({
    pipeline: options.pipeline,
    name: options.name,
    description: options.description
  }).then(function(response) {
    if(options.json) {
      console.log(response)
    } else {
      program.utils.tablePrint([response.pipeline])
    }
  })
}


module.exports = function(program) {
  program
    .command("pipelines:update")
    .description("update a pipeline")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-n, --name <name>", "name of pipeline")
    .option("-d, --description <description>", "description of pipeline")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}