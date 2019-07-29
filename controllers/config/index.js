module.exports = function(program) {
  require("./list")(program)
  require("./get")(program)
  require("./set")(program)
  require("./unset")(program)
}