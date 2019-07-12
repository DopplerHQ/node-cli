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
      _config = { "*": program.utils.load_env(legacy_config_path) }
      exports.write(_config)
      fs.unlinkSync(legacy_config_path)
      return _config
    }

    // Load existing config
    if(_config !== null) { return _config }

    // Set Config Default Value
    _config = { "*": {} }

    // Load Config from File
    if(fs.existsSync(config_path)) {
      try {
        _config = require(config_path)
      } catch(error) {
        console.error(chalk.red("Failed to parse config from disk with path " + config_path))
      }
    }

    return _config
  }

  exports.printable = function(all=false, input_path=".") {
    const current_path = path.resolve(input_path)
    const config = exports.load()
    const entries = []
    const scope_paths = new Set(Object.keys(config).filter(function(path) {
      return path === "*" || current_path.indexOf(path) == 0
    }).sort(function(a, b) {
      return b.length - a.length
    }))

    for (var scope in config) {
      if(!config.hasOwnProperty(scope)) { continue }

      for (var name in config[scope]) {
        if(!config[scope].hasOwnProperty(name)) { continue }

        if(all || scope_paths.has(scope)) {
          entries.push({
            name,
            value: config[scope][name],
            scope: scope
          })
        }
      }
    }

    return entries
  }

  exports.filtered = function(input_path=".") {
    const current_path = path.resolve(input_path)
    const config = exports.load()
    const scoped_configs = Object.keys(config).filter(function(path) {
      return path !== "*" && current_path.indexOf(path) == 0
    }).sort(function(a, b) {
      return a.length - b.length
    }).map(function(path) {
      return config[path]
    })

    // Merge global with closest match
    return Object.assign(config["*"], ...scoped_configs)
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