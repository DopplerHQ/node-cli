#!/usr/bin/env node

const program = require("commander")
const package = require("./package")

// Create CLI
program
  .version(package.version)
  .option("-k, --key <API KEY>", "override API key from '.doppler' file")
  .option("-e, --environment <NAME>", "override environment from '.doppler' file")
  .option("-p, --pipeline <ID>", "override pipeline from '.doppler' file")
  .option("-h, --host <ID>", "override Doppler API host (default: https://api.doppler.com)", "https://api.doppler.com")

// Attach Libs
require("./libs")(program)

// Register Controllers
require("./controllers")(program)

// Parse Arguments
program.parse(process.argv);

// Show Help
if (!program.args.length) program.help();
