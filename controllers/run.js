const chalk = require("chalk")
const fs = require("fs")
const path = require("path")

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
      "Please provide an environment. You can also set a default with the following command:\n" +
      "doppler setup"
    ))

    process.exit(1)
  }

  // Fetch variables from Doppler
  let variables = await program.deploy.variables.fetch({
    pipeline: credentials.pipeline,
    environment: credentials.environment,
    format: "json"
  }).then(async response => {
    // Update Fallback File
    if(options.fallback && !options.fallbackReadonly) {
      const full_path = path.resolve(process.cwd(), options.fallback)
      const tmp_path = `${full_path}.tmp.${process.pid}`
      const response = await program.deploy.variables.fetch({
        pipeline: credentials.pipeline,
        environment: credentials.environment,
        format: "file",
        metadata: false
      })

      try {
        fs.writeFileSync(tmp_path, response)
        fs.renameSync(tmp_path, full_path)
      } catch (error) {
        console.error(chalk.red(`Failed to write fallback file to ${full_path}`))

        if(fs.existsSync(tmp_path)) {
          fs.unlinkSync(tmp_path)
        }
      }
    }

    return response.variables
  }).catch((error) => {
    // Use fallback if available
    const variables = program.utils.load_env(options.fallback)

    if(variables) {
      console.error(chalk.yellow(`Using fallback file at ${options.fallback}`))
    }

    return variables
  })

  // Exit with status code if variables is null
  if(!variables) { process.exit(1) }

  const args = program.rawArgs.includes("--") ? program.rawArgs.slice(program.rawArgs.indexOf("--") + 1) : [argument]

  // Run command
  program.utils.runCommand(args.join(' '), {
    env: variables
  })
}


module.exports = function(program) {

  program
    .command("run <COMMAND>")
    .alias("local")
    .description("run your app with variables from Doppler")
    .option("-f, --fallback <DOTENV FILEPATH>", "writes to this file on boot and read from it when you lose connection to the Doppler API.")
    .option("--fr, --fallback-readonly", "treat the fallback file as read-only")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--", "interpret everything after this option as part of the command to run")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });

}
