const fs = require("fs")
const path = require("path")
const os = require("os")
const chalk = require("chalk")


module.exports = function(program) {
  const exports = {}
  let _config = null
  const config_path = path.join(os.homedir(), ".doppler.json")
  
  exports.load = function() { 
    // Migrate legacy config if needed
    const legacy_config_path = path.join(os.homedir(), ".doppler")
    if(fs.existsSync(legacy_config_path)) {
      const config = { "*": program.utils.load_env(legacy_config_path) } 
      fs.unlinkSync(legacy_config_path)
      return config
    }
    
    // Load existing config
    if(_config !== null) { return _config }

    if(fs.existsSync(config_path)) {      
      try {
        _config = require(config_path)
      } catch(error) {
        console.error(chalk.red("Failed to parse config from disk with path " + config_path))
      }
    }
    
    return _config
  }
  
  exports.printable = function() {
    const config = exports.load()
    const entries = []
    
    for (var scope in config) {
      if(!config.hasOwnProperty(scope)) { continue }          
        
      for (var name in config[scope]) {
        if(!config[scope].hasOwnProperty(name)) { continue } 
                 
        entries.push({
          name,
          value: config[scope][name],
          scope: scope
        })
      }
    }
    
    return entries
  }
  
  exports.filtered = function(input_path=".") {
    const current_path = path.resolve(input_path)
    const config = exports.load()
    return Object.assign({}, config["*"], config[current_path] || {})
  }
  
  exports.write = function(data) {
    // Filter empty scopes
    for (var scope in data) {
      if(!data.hasOwnProperty(scope)) { continue }   
      if(Object.keys(data[scope]).length > 0) { continue }
      delete data[scope]
    }
    
    _config = data
    fs.writeFile(config_path, JSON.stringify(data), function(error) {
      if(error != null) {
        console.error(chalk.red("Failed to write config to disk with path " + config_path))
      }  
    })
  }
    
  return exports
  
}