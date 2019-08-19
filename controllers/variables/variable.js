function task_runner(program, argument, options) {
  program.api.variables.variable({
    pipeline: options.pipeline,
    environment: options.environment,
    name: argument
  }).then(function(response) {
    if(options.json) {
      console.log(JSON.stringify(response))
    } else if(options.plain) {
      console.log(response.value.raw)
    } else {
      program.utils.tablePrint([{
        name: response.name,
        value: response.value.raw,
        computed: response.value.computed
      }])
    }
  })
}


module.exports = function(program) {
  program
    .command("variables:one <name>")
    .description("view specific variable in environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .option("--plain", "print with the value without formatting", false)
    .action(task_runner.bind(null, program));
}