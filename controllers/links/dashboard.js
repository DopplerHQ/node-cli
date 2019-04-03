const open = require("open")

function task_runner(program, argument, options) {
  open("https://doppler.com")
}


module.exports = function(program) {
  program
    .command("links:dashboard")
    .description("open the Doppler dashboard in your browser")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}