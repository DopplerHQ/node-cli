function task_runner(program, options) {
  program.api.pipelines.delete({
    pipeline: options.pipeline
  }).then(function(response) {
    if(options.json) {
      console.log(JSON.stringify(response))
    } else {
      console.log("Pipeline has been deleted.")
    }
  })
}


module.exports = function(program) {
  program
    .command("pipelines:delete")
    .description("delete the pipeline")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}