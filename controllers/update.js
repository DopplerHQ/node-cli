function task_runner(program, argument, options) {  
  program.utils.runCommand("npm install --global doppler-cli")
}


module.exports = function(program) {

  program
    .command("update")
    .description("update the Doppler cli")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
  
}
