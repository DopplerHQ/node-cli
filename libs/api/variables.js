module.exports.variables = {
  method: "GET",
  path: function(data) { 
    return "/v2/variables"
  },
  payload: ["pipeline", "environment"]
}

module.exports.variable = {
  method: "GET",
  path: function(data) { 
    return "/v2/variable"
  },
  payload: ["pipeline", "environment", "name"]
}

module.exports.set_variables = {
  method: "POST",
  path: function(data) { 
    return "/v2/variables"
  },
  payload: ["pipeline", "environment", "variables"]
}

module.exports.set_ignore = {
  method: "POST",
  path: function(data) { 
    return "/v2/variables/ignore"
  },
  payload: ["pipeline", "environment", "names"]
}