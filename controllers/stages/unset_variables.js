function task_runner() { 
  const args = Array.from(arguments) 
  const program = args.splice(0, 1)[0]
  const options = args.splice(-1)[0]
  const variables = {}
  
  if(args.length == 0) {
    return options.help()
  }
  
  for(var i=0; i < args.length; i++) {
    variables[args[i]] = null 
  }
   
  program.api.stages.set_variables({
    stage: options.stage,
    variables,
    pipeline: options.pipeline
  }).then(function(response) {
    if(options.json) {    
      console.log(response)
    } else {
      console.table(Object.keys(response.variables).map(function(name) {
        return {
          name,
          value: response.variables[name]
        }
      }))
    }
  })
}


module.exports = function(program) {
  program
    .command("stages:variables:unset")
    .description("unset stage's default variables")
    .option("-p, --pipeline <id>", "pipeline id")
    .option("-s, --stage <id or slug>", "stage id or slug")
    .option("--json", "print in json format", false)
    .action(task_runner.bind(null, program))
    .on('--help', function() {
      console.log('');
      console.log('Examples:');
      console.log('');
      console.log('  $ doppler stages:variables:unset KEY');
      console.log('  $ doppler stages:variables:unset KEY_1 KEY_2 ...');
      console.log('');
    });
}