function task_runner(program, name, options) {
  program.api.stages.variable({
    stage: options.stage,
    pipeline: options.pipeline,
    name: name
  }).then(function(response) {
    if(options.json) {
      console.log(JSON.stringify(response))
    } else if(options.plain) {
      console.log(response.value)
    } else {
      program.utils.tablePrint([{
        name: response.name,
        value: response.value
      }])
    }
  })
}


module.exports = function(program) {
  program
    .command("stages:variables:one <name>")
    .description("stage's specific default variable")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-s, --stage <id or slug>", "stage id or slug")
    .option("--json", "print in json format", false)
    .option("--plain", "print with the variables without formatting", false)
    .action(task_runner.bind(null, program));
}