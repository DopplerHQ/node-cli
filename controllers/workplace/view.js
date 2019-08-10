function task_runner(program, options) {
  program.api.workplace.view().then(function(response) {
    if(options.json) {
      console.log(response)
    } else {
      program.utils.tablePrint([response.workplace])
    }
  })
}


module.exports = function(program) {
  program
    .command("workplace")
    .description("workplace information")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}