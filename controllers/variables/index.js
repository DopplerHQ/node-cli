module.exports = function(program) {
  require("./variables")(program)
  require("./variable")(program)
  require("./variables_download")(program)
  require("./set_variables")(program)
  require("./unset_variables")(program)
  require("./ignore")(program)
  require("./set_ignore")(program)
  require("./unset_ignore")(program)
}