const striptags = require('striptags')
const moment = require('moment')
const fs = require("fs")


function task_runner(program, environment, log, options) {    
  program.api.environments.logs_rollback({
    pipeline: parseInt(options.pipeline),
    environment: environment,
    log: log
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
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
    .command("environments:logs:rollback <environment> <log>")
    .description("rollback environment audit log")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("--json", "print in json format", false)
    .action(function(environment, log, options) {
      task_runner(program, environment, log, options)
    });
}