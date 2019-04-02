 opn = require('opn')

function task_runner(program, argument, options) {
  opn("https://doppler.com/github")
}


module.exports = function(program) {
  program
    .command("links:github")
    .description("contribute to our open soure repos on Github")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
}