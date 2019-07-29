function task_runner(program, name) {
  const config = program.config.filtered()
  console.log(config[name] || "")

  if(!config.hasOwnProperty(name)) {
    process.exit(1)
  }
}


module.exports = function(program) {
  program
    .command("config:get <KEY>")
    .description("get config value for name")
    .action(task_runner.bind(null, program));
}