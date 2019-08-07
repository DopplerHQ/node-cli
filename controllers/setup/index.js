const helpers = require("./helpers")
const chalk = require("chalk")
const path = require("path")
const stage_formats = new Set(["dev", "development"]) // "development" slug is legacy


task_runner = (program, options) => {
  console.log(chalk.yellow(`Starting setup for ${path.resolve(options.scope)}`))

  helpers.pipeline(program).then(function(pipeline) {
    return helpers.environment(program, pipeline)

  }).then(function(credentials) {
    // Write credentials to config
    const config = program.config.load()
    const scope = path.resolve(options.scope)
    const scoped_config = config[scope] || {}

    scoped_config["pipeline"] = credentials.pipeline
    scoped_config["environment"] = credentials.environment

    config[scope] = scoped_config
    program.config.write(config)

    console.log(chalk.green("Congrats! You are now setup for local development."))
    console.log(chalk.green("You can see the configs we set by running 'doppler config' command."))
    console.log(chalk.green("To start developing with your Doppler environment run the 'doppler run \"<COMMAND>\"'."))

  }).catch(function(error) {
    console.error(chalk.red(error))
    process.exit(1)
  })
}



module.exports = (program) => {
  program
    .command("setup")
    .description("setup local development for a pipeline")
    .option("--scope <path>", "a directory path to scope the setup too.", ".")
    .action(function(options) {
      task_runner(program, options)
    });
}