const striptags = require('striptags')
const moment = require('moment')
const fs = require("fs")


function task_runner(program, options) {    
  program.api.logs.list().then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      const path = "/tmp/" + program.utils.random(15) + ".log"
      const body = response.logs.map(function(log) {
        return [
          "Log: " + log.id,
          "Actor: " + log.user.name + " <" + log.user.email + ">",
          "Date: " +  moment(log.created_at).format("ddd MMM d H:MA"),
          "",
          "\t" + striptags(log.text),
          "\n"
        ].join("\n")
      }).join("\n\n")
      
      fs.writeFileSync(path, body)
      program.utils.runCommand("more -d " + path + "; rm " + path)
    }
  })
}


module.exports = function(program) {
  program
    .command("logs")
    .description("workplace activity logs")
    .option("--json", "print in json format", false)
    .action(function(options) {
      task_runner(program, options)
    });
}