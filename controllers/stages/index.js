module.exports = function(program) {
  require("./list")(program)
  require("./view")(program)
  require("./variables")(program)
  require("./variable")(program)
  require("./set_variables")(program)
  require("./unset_variables")(program)
}