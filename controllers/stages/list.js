function task_runner(program, options) {
  program.api.stages.list({
    pipeline: options.pipeline
  }).then(function(response) {
    if(options.json) {
      console.log(JSON.stringify(response))
    } else {
      program.utils.tablePrint(response.stages)
    }
  })
}


module.exports = function(program) {
  program
    .command("stages")
    .description("list of a pipelines's stages")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}