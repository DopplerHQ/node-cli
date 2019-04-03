const open = require("open")

function task_runner(program, argument, options) {
  open("https://doppler.com/slack")
}


module.exports = function(program) {
  program
    .command("links:slack")
    .description("join our Slack community in your browser")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}