const path = require("path")
const open = require("open")
const chalk = require("chalk")


function task_runner(program, options) {
  const config = program.config.load()
  config["*"].key = response.api_key
  program.config.write(config)
  program._events["command:setup"]()

  // Open Browser
  const login_url = `${options.provider}/workplace/auth/cli?port=${port}`
  console.log(chalk.yellow("Opening the browser to log you into Doppler..."))
  console.log(chalk.yellow(`If the browser did not open, please go this url: ${login_url}`))
  open(login_url)
}


module.exports = function(program) {
  program
    .command("login")
    .description("login into Doppler on your computer")
    .option("--provider <domain>", "hostname of login server when using on-prem", "https://doppler.com")
    .action(function(options) {
      task_runner(program, options)
    });
}