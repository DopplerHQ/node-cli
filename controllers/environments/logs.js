const striptags = require("striptags")
const moment = require("moment")
const fs = require("fs")
const chalk = require("chalk")


function task_runner(program, options) {    
  program.api.environments.logs({
    pipeline: parseInt(options.pipeline),
    environment: options.environment
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.log(response.logs.map(function(log) {
        return [
          chalk.bold.yellow("Log: " + log.id),
          chalk.blue("Actor: " + log.user.name + " <" + log.user.email + ">"),
          chalk.magenta("Date: " +  moment(log.created_at).format("ddd MMM d H:MA")),
          "",
          "\t" + striptags(log.text),
          "\n"
        ].join("\n")
      }).join("\n\n"))
    }
  })
}


module.exports = function(program) {
  program
    .command("environments:logs")
    .description("environment audit logs")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}