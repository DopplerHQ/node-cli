module.exports = function(program) {
  require("./list")(program)
  require("./create")(program)
  require("./delete")(program)
  require("./view")(program)
  require("./update")(program)
}