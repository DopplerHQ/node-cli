#!/usr/bin/env node

const program = require("commander")
const package = require("./package")
const request = require("request-promise")
const chalk = require("chalk")
const enquirer = require("enquirer")
require('console.table')

// Promises
global.Promise = require("bluebird")

// Create CLI
program.name = "doppler"
program
  .version(package.version)
  .option("-k, --key <API KEY>", "override the API Key in configs")
  .option("-h, --host <HOST URL>", "override Doppler's API host", "https://api.doppler.com")

// Attach Libs
require("./libs")(program)

// Register Controllers
require("./controllers")(program)

// Parse Arguments
program.parse(process.argv);

// Show Help
if(!program.args.length) {
  // Check Version Number
  request({
    uri: "https://registry.npmjs.org/" + package.name,
    json: true
  }).then(function(response) {
    program.outputHelp(helpText => {
      if(response["dist-tags"] !== undefined && response["dist-tags"]["latest"] !== package.version) {
        helpText = chalk.green(
          `An updated verion (${response["dist-tags"]["latest"]}) of the Doppler CLI is available:\n` +
          "doppler update\n"
        ) + helpText
      }

      program.utils.scrollPrint("Help", helpText)
      return "";
    })
  })
}