const fs = require("fs")
const path = require("path")
const os = require("os")
const chalk = require("chalk")


module.exports = function(program) {
  const exports = {}
  let _config = null
  const config_path = path.join(os.homedir(), ".doppler.json")

  const path_trailing_slash = (input_path) => {
    if(input_path[input_path.length - 1] !== "/") { input_path += "/" }
    return path.normalize(input_path)
  }

  exports.load = () => {
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

  exports.printable = (all=false, input_path=".") => {
    const current_path = path_trailing_slash(path.resolve(input_path))
    const config = exports.load()
    const entries = []
    const scope_paths = new Set(Object.keys(config).filter(function(path) {
      if(path === "*") { return true }
      return current_path.startsWith(path_trailing_slash(path))
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

  exports.filtered = (input_path=".") => {
    const current_path = path_trailing_slash(path.resolve(input_path))
    const config = exports.load()
    const scoped_configs = Object.keys(config).filter(function(path) {
      if(path === "*") { return true }
      return current_path.startsWith(path_trailing_slash(path))
    }).sort(function(a, b) {
      return a.length - b.length
    }).map(function(path) {
      return config[path]
    })

    // Merge global with closest match
    return Object.assign({}, config["*"], ...scoped_configs)
  }

  exports.write = (data) => {
    // Filter empty scopes
    for (var scope in data) {
      if(!data.hasOwnProperty(scope)) { continue }
      if(Object.keys(data[scope]).length > 0) { continue }
      delete data[scope]
    }

    _config = data

    try {
      fs.writeFileSync(config_path, JSON.stringify(_config))
    } catch(_) {
      console.error(chalk.red("Failed to write config to disk with path " + config_path))
      process.exit(1)
    }
  }

  return exports

}