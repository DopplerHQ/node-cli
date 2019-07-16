const enquirer = require("enquirer")
const chalk = require("chalk")


const create_pipeline = (program) => {
  console.log(chalk.yellow("We couldn't find a pipeline, so let's create one now."))

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
  ]).then((answers) => {
    return program.api.pipelines.create(answers)
  }).then(response => response.pipeline.id)
}



const select_pipeline = (pipelines) => {
  return enquirer.prompt({
    type: "autocomplete",
    name: "pipeline",
    limit: 10,
    message: "Select your project's pipeline",
    highlight: (str => chalk.black.bgCyanBright(str)),
    choices: pipelines
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((pipeline) => ({
        hint: pipeline.id,
        value: pipeline.id,
        message: pipeline.name
      }))
  }).then(answers => answers.pipeline)
}



const select_environment = (environments) => {
  return enquirer.prompt({
    type: "autocomplete",
    name: "environment",
    limit: 10,
    message: "Select your development environment",
    highlight: (str => chalk.black.bgCyanBright(str)),
    choices: environments.map((environment) => ({
      value: environment.name,
      message: environment.name
    }))
  }).then(answers => answers.environment)
}



const create_environment = (program, pipeline) => {
  console.log(chalk.yellow("No development environments found, so let's create one."))

  return enquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Your First Name:",
    }
  ]).then((answers) => {
    return program.api.environments.create({
      name: `dev_${answers.name.toLowerCase()}`,
      pipeline,
      stage: "dev",
      defaults: true
    })
  }).then(response => response.environment.name)
}



module.exports.pipeline = (program) => {
  return program.api.pipelines.list().then((response) => {
    if(response.pipelines.length > 0) {
      return select_pipeline(response.pipelines)
    }

    return create_pipeline(program)
  })
}


module.exports.environment = (program, pipeline) => {
  const stage_formats = new Set(["dev", "development"]) // "development" slug is legacy

  return program.api.stages.list({ pipeline }).then((response) => {
    if(response.stages.filter(({id}) => stage_formats.has(id)).length === 0) {
      return Promise.reject("You do not have development access for this pipeline. Please contact your workplace owner.")
    }

    // Select or create environment
    return program.api.environments.list({ pipeline })

  }).then((response) => {
    const environments = response.environments.filter(({stage}) => stage_formats.has(stage))

    if(environments.length > 0) {
      return select_environment(environments)
    }

    return create_environment(program, pipeline)

  }).then((environment) => ({ pipeline, environment }))
}

