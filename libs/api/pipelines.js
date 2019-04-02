module.exports.list = {
  method: "GET",
  path: function(data) { 
    return "/v2/pipelines" 
  }
}

module.exports.view = {
  method: "GET",
  path: function(data) { 
    return "/v2/pipelines/" + data.pipeline 
  }
}

module.exports.create = {
  method: "POST",
  path: function(data) { 
    return "/v2/pipelines" 
  },
  payload: ["name", "description"]
}

module.exports.update = {
  method: "POST",
  path: function(data) { 
    return "/v2/pipelines/" + data.pipeline 
  },
  payload: ["name", "description"]
}

module.exports.delete = {
  method: "DELTE",
  path: function(data) { 
    return "/v2/pipelines/" + data.pipeline 
  }
}