const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")
const spawn = require("exec-sh")


module.exports.credentials = function(program) {
  const config = module.exports.load_env(".doppler") || {}
  const api_key = program.key || config.API_KEY
  const pipeline = program.pipeline || config.PIPELINE
  const environment = program.environment || config.ENVIRONMENT
    
  if(api_key == null || pipeline == null || environment == null) {
    console.error(
      "Please create a .doppler file in this directory with the following values.\n\n" +   
      "API_KEY = <DOPPLER_API_KEY>\n" +
      "PIPELINE = <PIPELINE ID>\n" +
      "ENVIRONMENT = <ENVIRONMENT NAME>\n"
    )
    
    process.exit(1)
  }
  
  return {
    api_key,
    pipeline,
    environment
  }
}


module.exports.load_env = function(filePath) {
  const env = dotenv.config({ 
    path: path.resolve(process.cwd(), filePath) 
  })
  
  return env.parsed || null
}

module.exports.write_env = function(doppler, file_path) {
  var body = []

  for(var key in doppler.remote_keys) {
    if(!doppler.remote_keys.hasOwnProperty(key)) { continue }
    
    const value = doppler.remote_keys[key]
    body.push(key + " = " + value)
  }
  
  const full_path = path.resolve(process.cwd(), file_path)
  const full_body = body.join("\n")
  fs.writeFile(full_path, full_body, function(error) {
    if(error != null) {
      console.error("Failed to write backup to disk with path " + full_path)
    }  
  })
}

module.exports.write_htaccess = function(doppler, file_path) {
  var body = []

  for(var key in doppler.remote_keys) {
    if(!doppler.remote_keys.hasOwnProperty(key)) { continue }
    
    const value = doppler.remote_keys[key]
    body.push("SetEnv " + key + " '" + value + "'")
  }
  
  const full_path = path.resolve(process.cwd(), file_path)
  const full_body = body.join("\n")
  fs.writeFile(fullPath, full_body, function(error) {
    if(error != null) {
      console.error("Failed to write backup to disk with path " + full_path)
    }  
  })
}

module.exports.runCommand = function(dir, cmd, options) {  
  try {
    options.cwd = dir
    options.env.PATH = process.env.PATH
    options.env.PS1 = process.env.PS1
    options.env.HOME = process.env.HOME
    options.stdio = "inherit"
    
    const child = spawn(cmd, options)
    
    function exit_handler(exitCode) {
      child.kill();
      process.exit(exitCode || 1);
    }
    
    process.on("exit", exit_handler);
    process.on("SIGINT", exit_handler.bind(null, 2));
    process.on("uncaughtException", exit_handler.bind(null, 99));
    child.on("error", exit_handler.bind(null, 99));
    
    return child

  } catch (e) {
    console.error("Error trying to execute command '" + cmd + "' in directory '" + dir + "'");
    console.error(e);
    console.log("error", e.message);
  }
}