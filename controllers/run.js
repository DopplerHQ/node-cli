const chalk = require("chalk")

const task_runner = async (program, argument, options) => {
  // Ensure credentials are supplied
  const credentials = program.utils.load_credentials(options)

  if(credentials.pipeline === null) {
    console.error(chalk.red(
      "Please provide a pipeline. You can also set a default with the following command:\n" +
      "doppler setup"
    ))

    process.exit(1)
  }

  if(credentials.environment === null) {
    console.error(chalk.red(
      "Please provide a environment. You can also set a default with the following command:\n" +
      "doppler setup"
    ))

    process.exit(1)
  }

  // Fetch variables from Doppler
  let response = await program.deploy.variables.fetch({
    pipeline: credentials.pipeline,
    environment: credentials.environment,
    format: "json"
  })

  // Use fallback if needed and available
  if(!response) {
    response = {
      variables: program.utils.load_env(options.fallback)
    }

    if(!response.variables) { process.exit(1) }

    console.error(chalk.yellow(`Using fallback file at ${options.fallback}`))
  }

  // Run command
  program.utils.runCommand(argument, {
    env: response.variables
  })
}


module.exports = function(program) {

  program
    .command("run <COMMAND>")
    .alias("local")
    .description("run your app with variables from Doppler")
    .option("-f, --fallback <DOTENV FILEPATH>", "writes to this file on boot and read from it when you lose connection to the Doppler API.")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });

}
