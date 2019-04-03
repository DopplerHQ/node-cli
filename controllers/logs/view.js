const striptags = require('striptags')
const moment = require('moment')


function task_runner(program, argument, options) {    
  program.api.logs.view({
    log: argument
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      const path = "/tmp/" + program.utils.random(15) + ".log"
      const log = response.log
      console.log([
        "Log: " + log.id,
        "Actor: " + log.user.name + " <" + log.user.email + ">",
        "Date: " +  moment(log.created_at).format("ddd MMM d H:MA"),
        "",
        "\t" + striptags(log.text),
        "\n"
      ].join("\n"))
    }
  })
}


module.exports = function(program) {
  program
    .command("logs:view <id>")
    .description("specific workplace activity log")
    .option("--json", "print in json format", false)
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}