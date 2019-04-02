function task_runner(program, options) {
  program.api.stages.list({
    pipeline: parseInt(options.pipeline)
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table(response.stages) 
    }
  })
}


module.exports = function(program) {
  program
    .command("stages")
    .description("list of a pipelines's stages")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(options) {
      task_runner(program, options)
    });
}