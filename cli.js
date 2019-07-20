#!/usr/bin/env node

const program = require("commander")
const package = require("./package")
const axios = require("axios")
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
  axios({
    url: "https://registry.npmjs.org/" + package.name,
    responseType: "json"
  }).then(function(response) {
    const { data } = response;
    program.outputHelp(helpText => {
      if(data["dist-tags"] !== undefined && data["dist-tags"]["latest"] !== package.version) {
        helpText = chalk.green(
          `An updated verion (${data["dist-tags"]["latest"]}) of the Doppler CLI is available:\n` +
          "doppler update\n"
        ) + helpText
      }

      program.utils.scrollPrint("Help", helpText)
      return "";
    })
  })
}