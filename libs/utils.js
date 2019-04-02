const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")
const spawn = require("exec-sh")
const doppler = require("doppler-client")


module.exports = function(program) {
  var exports = {}
  
  exports.doppler = function(fallback_path = null) {
    const credentials = exports.load_credentials()
    
    return doppler({
      api_key: credentials.api_key,
      pipeline: credentials.pipeline,
      environment: credentials.environment,
      client_sdk: "cli",
      client_version: program.version(),
      backup_filepath: fallback_path
    })
  }
  
  
  exports.load_credentials = function() {
    const config = exports.load_env(".doppler") || {}
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
    
    return { api_key, pipeline, environment }
  }
  
  
  exports.load_env = function(file_path) {
    const env = dotenv.config({ 
      path: path.resolve(process.cwd(), file_path) 
    })
    
    return env.parsed || null
  }
  
  exports.write_env = function(doppler, file_path) {
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
  
  exports.runCommand = function(dir, cmd, options) { 
    function exit_handler(exitCode) {
      this.kill();
      process.exit(exitCode || 1);
    }
     
    try {
      options.cwd = dir
      options.env.PATH = process.env.PATH
      options.env.PS1 = process.env.PS1
      options.env.HOME = process.env.HOME
      options.env.TERM = "xterm-color"
      
      const child = spawn(cmd, options)
      
      process.on("exit", exit_handler.bind(child));
      process.on("SIGINT", exit_handler.bind(child, 2));
      process.on("uncaughtException", exit_handler.bind(child, 99));
      child.on("error", exit_handler.bind(child, 99));
      
      return child
  
    } catch (e) {
      console.error("Error trying to execute command '" + cmd + "' in directory '" + dir + "'");
      console.error(e);
      console.log("error", e.message);
    }
  }
  
  return exports
  
}
