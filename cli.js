#!/usr/bin/env node

const program = require('commander')
const package = require("./package")
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
if (!program.args.length) program.help();
