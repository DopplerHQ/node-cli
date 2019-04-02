module.exports = function(program) {
  const controllers = [
    require("./help"),
    require("./local"),
    require("./update"),
    require("./workplace"),
    require("./logs"),
    require("./pipelines"),
    require("./stages"),
    require("./environments"),
    require("./variables")
  ]
  
  for(var i = 0; i < controllers.length; i++) {
    controllers[i](program)
    program.command("")
  }
}
