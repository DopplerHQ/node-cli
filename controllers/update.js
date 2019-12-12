const open = require("open")
const chalk = require("chalk")
const enquirer = require("enquirer")

async function task_runner(program, argument, options) {
  const prompt = new enquirer.Confirm({
    name: 'open',
    message: chalk.yellow("Open browser to upgrade:"),
    initial: true,
  })

  if(await prompt.run()) {
    open("https://docs.doppler.com/docs/enclave-installation")
  }
}


module.exports = function(program) {

  program
    .command("update")
    .description("update the Doppler cli")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });

}
