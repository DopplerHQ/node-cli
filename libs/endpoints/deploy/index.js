module.exports = function(program) {
  // Import Definitions
  const definition_groups = {
    variables: require("./variables")
  }

  // Export Endpoints
  return require("../builder")(program, program.deployHost, definition_groups)
}
