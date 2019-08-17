const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")
const spawn = require("exec-sh")
const hasher = require("random-hash")
const chalk = require("chalk")
const os = require("os")
const cTable = require('console.table')
const commandExists = require('command-exists').sync


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
        "Please provide a pipeline. You can also set a default with the following command:\n" +
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
    const config = program.config.filtered()
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
    var env = dotenv.config({
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

  exports.env_escape = (text)=> {
    return text.replace(/\\/g, '\\\\').replace(/\"/g, '\\"')
  }

  exports.tmpFile = () => {
    return path.join(os.tmpdir(), exports.random(15))
  }

  exports.writeTmpFile = (text) => {
    const filePath = `${exports.tmpFile()}.txt`
    fs.writeFileSync(filePath, text, 'utf8')
    return filePath
  }

  exports.table = (input) => {
    const table = []

    // Iterate through rows
    for (var i in input) {
      let row = input[i]
      let max_line_count = Math.max(...Object.keys(row).map(key => {
        row[key] = (row[key] || "").split(/\r\n|\r|\n/)
        return row[key].length
      }))

      // Build rows for multiple lines
      for(let i = 0; i < max_line_count; i++) {
        let new_row = {}

        for(let property in row) {
          if(!row.hasOwnProperty(property)) { continue }
          new_row[property] = row[property][i] || ""
        }

        table.push(new_row)
      }
    }

    return cTable.getTable(table)
  }

  exports.tablePrint = (table) => {
    console.log(program.utils.table(table))
  }

  exports.scrollTablePrint = (prompt, table) => {
    program.utils.scrollPrint(prompt, program.utils.table(table))
  }

  exports.scrollPrint = (prompt, text) => {
    let command;

    if(text.split("\n").length < 30) {
      return console.log(text)
    }

    if(commandExists("less")) {
      command = `less -S -R -K -L -f -P 's${prompt}\\: q or ctr-c to quit'`
    } else if(commandExists("more")) {
      command = `more`
    } else {
      return console.log(text)
    }

    const filePath = exports.writeTmpFile(text)
    program.utils.runCommand(`${command} ${filePath}`, {}, () => {
      fs.unlinkSync(filePath)
    })
  }

  exports.runCommand = function(cmd, options={}, callback) {
    // Exit handler could be called more than once
    let callback_called = false
    function exit_handler(exitCode) {
      if(!callback_called && callback !== undefined) {
        callback_called = true
        return callback(exitCode, process.exit.bind(process, exitCode));
      }

      process.exit(exitCode || 0)
    }

    try {
      options.cwd = process.cwd()
      options.env = Object.assign({}, process.env, options.env || {})
      options.env.PATH = process.env.PATH
      options.env.PS1 = process.env.PS1
      options.env.HOME = process.env.HOME

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
