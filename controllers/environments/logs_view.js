const striptags = require("striptags")
const moment = require("dayjs")
const chalk = require("chalk")


function task_runner(program, options) {
  program.api.environments.logs_view({
    log: options.log,
    pipeline: options.pipeline,
    environment: options.environment
  }).then(function(response) {
    if(options.json) {
      console.log(JSON.stringify(response))
    } else {
      const { log } = response

      const diff = log.diff.sort(function(a, b) {
        const a_value = a.name || a.added || a.removed
        const b_value = b.name || a.added || a.removed
        return a_value.localeCompare(b_value)
      }).map(function(change) {
        let added_body = change.added || ""
        let removed_body = change.removed || ""

        if(change.name !== undefined) {
          added_body = `${change.name} = "${added_body}"`
          removed_body = `${change.name} = "${removed_body}"`
        }

        return `${chalk.redBright(`- ${removed_body}`)}\n${chalk.greenBright(`+ ${added_body}`)}`
      }).join("\n\n")

      const text = [
        chalk.bold.yellow(`Log: ${log.id}`),
        `Actor: ${log.user.name} <${log.user.email}>`,
        `Date: ${moment(log.created_at).format("ddd MMM d H:MA")}`,
        `\n\t${striptags(log.text)}\n\n`,
        diff
      ].join("\n")

      program.utils.scrollPrint(`Log: ${log.id}`, text)
    }
  })
}


module.exports = function(program) {
  program
    .command("environments:logs:view")
    .description("view environment audit log diff")
    .option("-l, --log <id>", "log id")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program));
}