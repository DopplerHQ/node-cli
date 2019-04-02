module.exports.list = {
  method: "GET",
  path: function(data) { 
    return "/v2/logs"
  }
}

module.exports.view = {
  method: "GET",
  path: function(data) { 
    return "/v2/logs/" + data.log 
  }
}