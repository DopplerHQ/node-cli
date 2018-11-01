const fs = require("fs")
const path = require("path")
const dotenv = require('dotenv')
const spawn = require('exec-sh')


module.exports.credentials = function(program) {
  var api_key = program.key || null
  var pipeline = program.pipeline || null
  var environment = program.environment || null
  
  const config = module.exports.load_env('.doppler')
  
  if(config != null) {
    if(api_key == null) api_key = config.API_KEY;
    if(pipeline == null) pipeline = config.PIPELINE;
    if(environment == null) environment = config.ENVIRONMENT;
  
  } else if(!api_key || !pipeline || !environment) {
    console.error(
      "Please create a .doppler file in this directory with the following values.\n\n" +   
      "API_KEY = <DOPPLER_API_KEY>\n" +
      "PIPELINE = <PIPELINE ID>\n" +
      "ENVIRONMENT = <ENVIRONMENT NAME>\n"
    )
    
    process.exit(1)
  }
  
  return {
    api_key: api_key,
    pipeline: pipeline,
    environment: environment
  }
}


module.exports.load_env = function(filePath) {
  const env = dotenv.config({ 
    path: path.resolve(process.cwd(), filePath) 
  })
  
  return env.parsed || null
}


module.exports.runCommand = function(dir, cmd, options) {
  try {
    options.cwd = dir
    options.env.PATH = process.env.PATH
    options.env.PS1 = process.env.PS1
    options.env.HOME = process.env.HOME
    options.stdio = 'inherit'
    
    const child = spawn(cmd, options)
    
    process.on('exit', exitHandler);
    process.on('SIGINT', exitHandler.bind(null, 2));
    process.on('uncaughtException', exitHandler.bind(null, 99));
    child.on('error', exitHandler.bind(null, 99));
     
    function exitHandler(exitCode) {
      child.kill();
      process.exit(exitCode || 1);
    }
    
    return child

  } catch (e) {
    console.error("Error trying to execute command '" + cmd + "' in directory '" + dir + "'");
    console.error(e);
    console.log("error", e.message);
  }
}