#!/usr/bin/env node

throw new Error("This package is deprecated and no longer functional. Learn how to migrate to the new CLI - https://docs.doppler.com/docs/saying-goodbye-to-the-doppler-client-packages-node-cli")

const program = require("commander")
const package = require("./package")
const axios = require("axios")
const chalk = require("chalk")
const enquirer = require("enquirer")

// Promises
global.Promise = require("bluebird")

// Create CLI
program.name = "doppler"
program
  .version(package.version)
  .option("--no-read-env", "Do not read Doppler credentials from environment variables: DOPPLER_API_KEY, DOPPLER_PIPELINE, DOPPLER_ENVIRONMENT", false)
  .option("-k, --key <API KEY>", "override the API Key in configs")
  .option("--api-host <HOST URL>", "override Doppler's API host", "https://api.doppler.com")
  .option("--deploy-host <HOST URL>", "override Doppler's Deploy host", "https://deploy.doppler.com")

// Attach Libs
require("./libs")(program)

// Register Controllers
require("./controllers")(program)

// New Doppler CLI Banner
const args = new Set(process.argv)

if(!args.has("--json") && !args.has("--plain")) {
  console.log(chalk.red("DEPRECATED: Please use the new CLI at https://docs.doppler.com/docs/enclave-installation\n\n"))
}

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