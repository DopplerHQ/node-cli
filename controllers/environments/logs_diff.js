const striptags = require("striptags")
const moment = require("moment")
const fs = require("fs")


function write_file(program, log, lookup) {
  const diff = log.diff.sort(function(a, b) {
    const a_value = a.name || a[lookup] || a.added || a.removed
    const b_value = b.name || b[lookup] || a.added || a.removed
    return a_value.localeCompare(b_value)
  })
    
  return Promise.map(diff, function(line) {
    var body = line[lookup] || ""
    
    if(line.name) {
      body = line.name + " = " + body 
    }
    
    return body
  }).then(function(lines) {
    const path = "/tmp/" + program.utils.random(15) + ".log"  
    fs.writeFileSync(path, lines.join("\n") + "\n")
    return path
  })
}

function task_runner(program, options) {    
  program.api.environments.logs_view({
    log: options.log,
    environment: options.environment,
    pipeline: options.pipeline
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {      
      const log = response.log
      
      Promise.props({
        added: write_file(program, log, "added"),
        removed: write_file(program, log, "removed")
      }).then(function(files) {
        console.log([
          "Log: " + log.id,
          "Actor: " + log.user.name + " <" + log.user.email + ">",
          "Date: " +  moment(log.created_at).format("ddd MMM d H:MA"),
          "",
          "\t" + striptags(log.text),
          ""
        ].join("\n"))
        
        program.utils.runCommand("git diff --no-index --color " + files.removed + " " + files.added + " | tail -n +5; rm " + files.removed + " " + files.added)
      })
    }
  })
}


module.exports = function(program) {
  program
    .command("environments:logs:diff")
    .description("diff of environment audit log")
    .option("-l, --log <id>", "log id")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}