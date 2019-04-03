const opn = require("opn")

function task_runner(program, argument, options) {
  opn("https://doppler.com")
}


module.exports = function(program) {
  program
    .command("links:dashboard")
    .description("your Doppler dashboard")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}