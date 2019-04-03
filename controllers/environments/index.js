module.exports = function(program) {
  require("./list")(program)
  require("./create")(program)
  require("./delete")(program)
  require("./view")(program)
  require("./update")(program)
  require("./logs")(program)
  require("./logs_view")(program)
  require("./logs_rollback")(program)
  require("./logs_diff")(program)
}