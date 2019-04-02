module.exports.view = {
  method: "GET",
  path: function(data) { 
    return "/v2/workplace"
  }
}

module.exports.update = {
  method: "POST",
  path: function(data) { 
    return "/v2/workplace"
  },
  payload: ["name", "billing_email"]
}