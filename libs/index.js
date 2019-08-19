module.exports = function(program) {
  program.config = require("./config")(program)
  program.utils = require("./utils")(program)
  program.api = require("./endpoints/api")(program)
  program.deploy = require("./endpoints/deploy")(program)
}