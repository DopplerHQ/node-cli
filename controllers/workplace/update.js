function task_runner(program, options) {
  program.api.workplace.update({
    name: options.name,
    billing_email: options.billing
  }).then(function(response) {
    if(options.json) {
      console.log(JSON.stringify(response))
    } else {
      program.utils.tablePrint([response.workplace])
    }
  })
}


module.exports = function(program) {
  program
    .command("workplace:update")
    .description("update workplace")
    .option("-n, --name <name>", "name of workplace")
    .option("-b, --billing <email>", "billing email")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}