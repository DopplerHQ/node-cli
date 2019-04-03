const opn = require("opn")

function task_runner(program, argument, options) {
  opn("https://doppler.com/slack")
}


module.exports = function(program) {
  program
    .command("links:slack")
    .description("join our Slack community")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}