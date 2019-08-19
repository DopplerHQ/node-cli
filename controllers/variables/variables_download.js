const path = require("path")
const fs = require("fs")

const task_runner = async (program, file_path, options) => {
  const full_path = path.resolve(process.cwd(), file_path)
  const response = await program.deploy.variables.fetch({
    pipeline: options.pipeline,
    environment: options.environment,
    format: "file",
    metadata: options.metadata
  })

  try {
    fs.writeFileSync(full_path, response)
  } catch (error) {
    console.error(chalk.error(`Failed to write file to ${full_path}`))
    process.exit(1)
  }
}


module.exports = function(program) {
  program
    .command("variables:download <path>")
    .description("download an environment's dotenv file")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--no-metadata", "add metadata to file")
    .action(task_runner.bind(null, program));
}