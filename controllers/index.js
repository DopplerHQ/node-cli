module.exports = function(program) {
  require("./help")(program)
  require("./local")(program)
  require("./download")(program)
}