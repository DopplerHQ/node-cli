const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")
const spawn = require("exec-sh")
const hasher = require("random-hash")
const chalk = require("chalk")


module.exports = function(program) {
  var exports = {}
  
  exports.random = function(length) {
    return hasher.generateHash({ 
      length: length || 10,
      charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789aA'
    })
  }
  
  exports.doppler = function(data={}) {
    const credentials = exports.load_credentials(data)
    
    if(credentials.pipeline == null) {
      console.error(chalk.red(
        "Please provide a pipline. You can also set a default with the following command:\n" +
        "doppler config:set pipeline <PIPELINE ID>"
      ))
      
      process.exit(1)
    }
    
    if(credentials.environment == null) {
      console.error(chalk.red(
        "Please provide a environment. You can also set a default with the following command:\n" +
        "doppler config:set environment <ENVIRONMENT NAME>"
      ))
      
      process.exit(1)
    }
    
    return require("@dopplerhq/client")({
      api_key: credentials.api_key,
      pipeline: credentials.pipeline,
      environment: credentials.environment,
      client_sdk: "cli",
      client_version: program.version(),
      backup_filepath: data.fallback
    })
  }
  
  exports.load_credentials = function(data={}) {
    const path = require('os').homedir() + "/.doppler"
    const config = exports.load_env(path) || {}
    const api_key = program.key || config.key || null
    const pipeline = data.pipeline || config.pipeline || null
    const environment = data.environment || config.environment || null
      
    if(api_key == null) {
      console.error(chalk.red(
        "Please set your Doppler API Key with the following command:\n" +
        "doppler config:set key <YOUR DOPPLER API KEY>"
      ))
      
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
  
  exports.write_env = function(config, file_path) {
    var body = []
  
    for(var key in config) {
      if(!config.hasOwnProperty(key)) { continue }
      
      const value = config[key]
      body.push(key + " = " + value)
    }
    
    const full_path = path.resolve(process.cwd(), file_path)
    const full_body = body.join("\n")
    fs.writeFile(full_path, full_body, function(error) {
      if(error != null) {
        console.error(chalk.red("Failed to write backup to disk with path " + full_path))
      }  
    })
  }
  
  exports.runCommand = function(cmd, options={}) { 
    function exit_handler(exitCode) {
      this.kill();
      process.exit(exitCode || 0);
    }
     
    try {
      options.cwd = process.cwd()
      options.env = options.env || {}
      options.env.PATH = process.env.PATH
      options.env.PS1 = process.env.PS1
      options.env.HOME = process.env.HOME
      options.env.TERM = "xterm-color"
      
      const child = spawn(cmd, options)
      
      process.on("exit", exit_handler.bind(child));
      process.on("SIGINT", exit_handler.bind(child));
      process.on("uncaughtException", exit_handler.bind(child));
      child.on("exit", exit_handler.bind(child));
      child.on("error", exit_handler.bind(child));
      
      return child
  
    } catch (e) {
      console.error(chalk.red("Error trying to execute command '" + cmd + "' in directory '" + process.cwd() + "'"));
      console.error(chalk.red(e));
      console.log(chalk.red("error", e.message));
    }
  }
  
  return exports
  
}
