module.exports = function(program) {
  require("./dashboard")(program)
  require("./slack")(program)
  require("./github")(program)
}