const helpers = require('./helpers')
const chalk = require("chalk")
const path = require("path")
const stage_formats = new Set(["dev", "development"]) // "development" slug is legacy


function task_runner(program, options) {
  console.log(chalk.yellow("Starting setup..."))

  Promise.resolve().then(function() {
    // Select or create pipeline
    return program.api.pipelines.list().then(function(response) {
      if(response.pipelines.length > 0) {
        return helpers.select_pipeline(response.pipelines)
      }

      return helpers.create_pipeline(program)
    })

  }).then(function(pipeline) {
    return program.api.stages.list({
      pipeline: pipeline
    }).then(function(response) {
      // Check if has development access
      const has_dev_access = response.stages.filter(function(stage) {
        return stage_formats.has(stage.id)
      }).length == 1

      if(!has_dev_access) {
        return Promise.reject("You do not have development access for this pipeline. Please contact your workplace owner.")
      }

      // Select or create environment
      return program.api.environments.list({
        pipeline: pipeline
      }).then(function(response) {
        const environments = response.environments.filter(function(environment) {
          return stage_formats.has(environment.stage)
        })

        if(environments.length > 0) {
          return helpers.select_environment(environments)
        }

        return helpers.create_environment(program, pipeline)

      }).then(function(environment) {
        return { pipeline, environment }
      })
    })

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
    console.log(chalk.green("To start developing with your Doppler environment run the 'doppler local \"<COMMAND>\"'."))

  }).catch(function(error) {
    console.error(chalk.red(error))
  })
}



module.exports = function(program) {
  program
    .command("setup")
    .description("setup local development for a pipeline")
    .option("--scope <path>", "a directory path to scope the setup too.", ".")
    .action(function(options) {
      task_runner(program, options)
    });
}