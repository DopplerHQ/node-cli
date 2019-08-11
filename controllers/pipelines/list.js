function task_runner(program, options) {
  program.api.pipelines.list().then(function(response) {
    if(options.json) {
      console.log(response)
    } else {
      program.utils.scrollTablePrint("Pipelines", response.pipelines)
    }
  })
}


module.exports = function(program) {
  program
    .command("pipelines")
    .description("list of pipelines")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}