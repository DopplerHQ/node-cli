function task_runner(program, options) {
  program.api.stages.variables({
    stage: options.stage,
    pipeline: options.pipeline
  }).then(function(response) {
    if(options.json) {
      console.log(response)
    } else if(options.plain) {
      console.log(Object.keys(response.variables).map(function(name) {
        return name + "=" + response.variables[name];
      }).join("\n"))
    } else {
      program.utils.scrollTablePrint("Variables", Object.keys(response.variables).map(function(name) {
        return {
          name,
          value: response.variables[name]
        }
      }))
    }
  })
}


module.exports = function(program) {
  program
    .command("stages:variables")
    .description("stage's default variables")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-s, --stage <id or slug>", "stage id or slug")
    .option("--json", "print in json format", false)
    .option("--plain", "print with the variables without formatting", false)
    .action(task_runner.bind(null, program));
}