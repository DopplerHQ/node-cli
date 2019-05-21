const open = require("open")

function task_runner(program, argument, options) {
  open("https://status.doppler.com")
}


module.exports = function(program) {
  program
    .command("links:status")
    .description("open the Doppler Status page in your browser")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}