module.exports = function(program) {
  require("./help")(program)
  require("./local")(program)
  require("./download")(program)
  require("./workplace")(program)
  require("./logs")(program)
  require("./pipelines")(program)
  require("./stages")(program)
  require("./environments")(program)
}