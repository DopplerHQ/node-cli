module.exports.list = {
  method: "GET",
  path: function(data) { 
    return "/v2/stages" 
  },
  payload: ["pipeline"]
}

module.exports.view = {
  method: "GET",
  path: function(data) { 
    return "/v2/stages/" + data.stage 
  },
  payload: ["pipeline"]
}

module.exports.variables = {
  method: "GET",
  path: function(data) { 
    return "/v2/stages/" + data.stage + "/variables"
  },
  payload: ["pipeline"]
}

module.exports.variable = {
  method: "GET",
  path: function(data) { 
    return "/v2/stages/" + data.stage + "/variable"
  },
  payload: ["pipeline", "name"]
}

module.exports.set_variables = {
  method: "POST",
  path: function(data) { 
    return "/v2/stages/" + data.stage + "/variables"
  },
  payload: ["pipeline", "variables"]
}