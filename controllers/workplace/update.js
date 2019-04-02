function task_runner(program, options) {  
  program.api.workplace.update({
    name: options.name,
    billing_email: options.billing
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table([response.workplace])
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
    .action(function(options) {
      task_runner(program, options)
    })
}