module.exports = function(program) {
  const controllers = [
    require("./help"),
    require("./setup"),
    require("./config"),
    require("./run"),
    require("./workplace"),
    require("./logs"),
    require("./pipelines"),
    require("./stages"),
    require("./environments"),
    require("./variables"),
    require("./links"),
    require("./update"),
  ]

  for(var i = 0; i < controllers.length; i++) {
    controllers[i](program)
    program.command("")
  }
}
