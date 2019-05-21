module.exports = function(program) {
  require("./dashboard")(program)
  require("./status")(program)
  require("./slack")(program)
  require("./github")(program)
}