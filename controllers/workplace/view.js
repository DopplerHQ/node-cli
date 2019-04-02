function task_runner(program, options) {
  program.api.workplace.view().then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table([response.workplace])
    }
  })
}


module.exports = function(program) {
  program
    .command("workplace")
    .description("workplace information")
    .option("--json", "print in json format", false)
    .action(function(argument) {
      task_runner(program, argument)
    });
}