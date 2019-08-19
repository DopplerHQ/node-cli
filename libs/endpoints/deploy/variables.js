module.exports.fetch = {
  method: "GET",
  exit_on_error: false,
  path: function(data) {
    return "/v1/variables"
  },
  payload: ["pipeline", "environment", "format", "metadata"]
}