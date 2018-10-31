const fs = require("fs")
const path = require("path")
const dotenv = require('dotenv')
const spawn = require('child_process').spawn


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
  var process = null;

  try {
    var cmdParts = cmd.split(/\s+/);
    options.cwd = dir
    return spawn(cmdParts[0], cmdParts.slice(1), options)
  
  } catch (e) {
    console.error("Error trying to execute command '" + cmd + "' in directory '" + dir + "'");
    console.error(e);
    console.log("error", e.message);
    return;
  }
}