const striptags = require('striptags')
const moment = require('moment')
const chalk = require("chalk")


function task_runner(program, options) {    
  program.api.logs.view({
    log: options.log
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
    .command("logs:view")
    .description("specific workplace activity log")
    .option("-l, --log <id>", "log id")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}