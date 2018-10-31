#!/usr/bin/env node

const program = require("commander")
const package = require("../package")


program
  .version(package.version)
  .option('-k, --key <API KEY>', 'override Doppler API key from ".doppler" file')
  .option('-e, --environment <NAME>', 'override Environment name from ".doppler" file')
  .option('-p, --pipeline <ID>', 'override Pipeline ID from ".doppler" file')


require("./local")(program)
require("./download")(program)
require("./help")(program)

program.parse(process.argv);

if (!program.args.length) program.help();
