module.exports = function(program) {
  // Import Definitions
  const definition_groups = {
    workplace: require("./workplace"),
    logs: require("./logs"),
    pipelines: require("./pipelines"),
    stages: require("./stages"),
    environments: require("./environments"),
    variables: require("./variables")
  }

  // Export Endpoints
  return require("../builder")(program, "apiHost", definition_groups)
}
