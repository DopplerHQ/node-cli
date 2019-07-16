#!/usr/bin/env node

const program = require("commander")
const package = require("./package")
const request = require("request-promise")
const chalk = require("chalk")
require('console.table')

// Promises
global.Promise = require("bluebird")

// Create CLI
program.name = "doppler"
program
  .version(package.version)
  .option("-k, --key <API KEY>", "override API key from '.doppler' file")
  .option("-h, --host <HOST URL>", "override Doppler API host", "https://api.doppler.com")

// Attach Libs
require("./libs")(program)

// Register Controllers
require("./controllers")(program)

// Parse Arguments
program.parse(process.argv);

// Show Help
if(!program.args.length) {
  const config = program.config.load()

  // Login if user is not authenticated
  if(config["*"].key === undefined) {
    return program._events["command:login"]()
  }

  // Check Version Number
  request({
    uri: "https://registry.npmjs.org/" + package.name,
    json: true
  }).then(function(response) {
    if(response["dist-tags"]["latest"] != package.version) {
      console.error(chalk.green(
        `An updated verion (${response["dist-tags"]["latest"]}) of the Doppler CLI is available:\n` +
        "doppler update\n"
      ))
    }

    // Print Help
    program.help();
  })
}