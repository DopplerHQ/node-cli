const inquirer = require('inquirer')
const chalk = require("chalk")



module.exports.create_pipeline = function(program) {
  console.log(chalk.yellow("We couldn't find a pipeline, so let's create a new one."))

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Pipeline Name:",
    },
    {
      type: 'input',
      name: 'description',
      message: "Pipeline Description:",
    }
  ]).then(function(answers) {
    return program.api.pipelines.create(answers)
  }).then(function(response) {
    return response.pipeline.id
  })
}



module.exports.select_pipeline = function(pipelines) {
  return inquirer.prompt({
    type: 'list',
    name: 'pipeline',
    default: pipelines[0],
    message: "Select your project's pipeline:",
    choices: pipelines.map(function(pipeline) {
      return {
        name: pipeline.name,
        value: pipeline.id
      }
    })
  }).then(function(answers) {
    return answers.pipeline
  })
}



module.exports.select_environment = function(environments) {
  return inquirer.prompt({
    type: 'list',
    name: 'environment',
    default: environments[0],
    message: "Select your development environment:",
    choices: environments.map(function(environment) {
      return {
        name: environment.name,
        value: environment.name
      }
    })
  }).then(function(answers) {
    return answers.environment
  })
}



module.exports.create_environment = function(program, pipeline) {
  console.log(chalk.yellow("No development environments found, so let's create one."))

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Your First Name:",
    }
  ]).then(function(answers) {
    return program.api.environments.create({
      name: "dev_" + answers.name.toLowerCase(),
      pipeline: pipeline,
      stage: "dev",
      defaults: true
    })
  }).then(function(response) {
    return response.environment.name
  })
}