module.exports = function(program) {

  program.on("command:*", function () {
    program.outputHelp()
    process.exit(1)
  });
  
}