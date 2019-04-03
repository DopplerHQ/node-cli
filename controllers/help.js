const chalk = require("chalk")


module.exports = function(program) {

  program.on("command:*", function (args) {
    console.log(chalk.bold.red("Command not found: "), args.join(" "))
    console.log(chalk.bold.blue("Use \"doppler --help\" to see all available commands."))
    process.exit(1)
  });
  
}