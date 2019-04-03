const open = require("open")

function task_runner(program, argument, options) {
  open("https://doppler.com/github")
}


module.exports = function(program) {
  program
    .command("links:github")
    .description("contribute to our open soure repos on Github in your browser")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}