const striptags = require('striptags')
const moment = require('moment')
const chalk = require("chalk")


function task_runner(program, argument, options) {    
  program.api.logs.view({
    log: argument
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      const log = response.log
      console.log([
        chalk.bold.yellow("Log: " + log.id),
        chalk.blue("Actor: " + log.user.name + " <" + log.user.email + ">"),
        chalk.magenta("Date: " +  moment(log.created_at).format("ddd MMM d H:MA")),
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