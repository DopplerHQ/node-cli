function task_runner() {  
  const args = Array.from(arguments) 
  const program = args.splice(0, 1)[0]
  const options = args.splice(-1)[0]
  const variables = {}
  
  if(args.length == 0) {
    return options.help()
  }
  
  for(var i=0; i < args.length; i++) {
    variables[args[i]] = true
  }
  
  program.api.variables.set_ignore({
    names: variables,
    environment: options.environment,
    pipeline: parseInt(options.pipeline)
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table(response.ignore.map(function(name) {
        return {
          name
        }
      }))
    }
  })
}


module.exports = function(program) {
  program
    .command("variables:ignore:set")
    .description("set variable to ignore in environment")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-e, --environment <name>", "environment name")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program))
    .on('--help', function() {
      console.log('');
      console.log('Examples:');
      console.log('');
      console.log('  $ doppler variables:ignore:set KEY');
      console.log('  $ doppler variables:ignore:set KEY_1 KEY_2 ...');
      console.log('');
    });
}