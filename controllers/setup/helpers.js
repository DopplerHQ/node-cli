const enquirer = require("enquirer")
const chalk = require("chalk")



module.exports.create_pipeline = function(program) {
  console.log(chalk.yellow("We couldn't find a pipeline, so let's create a new one."))

  return enquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Pipeline Name:",
    },
    {
      type: "input",
      name: "description",
      message: "Pipeline Description:",
    }
  ]).then(function(answers) {
    return program.api.pipelines.create(answers)
  }).then(function(response) {
    return response.pipeline.id
  })
}



module.exports.select_pipeline = function(pipelines) {
  return enquirer.prompt({
    type: "select",
    name: "pipeline",
    default: 0,
    message: "Select your project's pipeline:",
    choices: pipelines.map(function(pipeline) {
      return {
        message: pipeline.name,
        name: pipeline.id
      }
    })
  }).then(function(answers) {
    return answers.pipeline
  })
}



module.exports.select_environment = function(environments) {
  return enquirer.prompt({
    type: "select",
    name: "environment",
    default: 0,
    message: "Select your development environment:",
    choices: environments.map(function(environment) {
      return {
        message: environment.name,
        name: environment.name
      }
    })
  }).then(function(answers) {
    return answers.environment
  })
}



module.exports.create_environment = function(program, pipeline) {
  console.log(chalk.yellow("No development environments found, so let's create one."))

  return enquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Your First Name:",
    }
  ]).then(function(answers) {
    return program.api.environments.create({
      name: "dev_" + answers.name.toLowerCase(),
      pipeline,
      stage: "dev",
      defaults: true
    })
  }).then(function(response) {
    return response.environment.name
  })
}