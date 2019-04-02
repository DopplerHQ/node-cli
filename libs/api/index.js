const request = require("request-promise")


module.exports = function(program) {
  // Import Definitions
  const definition_groups = {
    workplace: require("./workplace"),
    logs: require("./logs"),
    pipelines: require("./pipelines"),
    stages: require("./stages"),
    environments: require("./environments")
  }
  
  // Build Endpoints
  const endpoints = {}
  
  for(var group_name in definition_groups) {
    if(!definition_groups.hasOwnProperty(group_name)) { continue }
    const definitions = definition_groups[group_name]
    endpoints[group_name] = {}
    
    // Build Requests per Defintion
    for(var key in definitions) {
      if(!definitions.hasOwnProperty(key)) { continue }
      const definition = definitions[key]

      endpoints[group_name][key] = function(input) {
        // Build Request
        const data = Object.assign(program.utils.load_credentials(), input)
        var request_data = {
          method: definition.method,
          uri: program.host + definition.path(data),
          json: true,
          headers: {
            "api-key": data.api_key,
            "client-sdk": "cli",
            "client-version": program.version(),
          }
        }
        
        // Build Payload
        var payload = {}
        if(definition.hasOwnProperty("payload")) {
          for (var i = 0; i < definition.payload.length; i++) {
            const payload_key = definition.payload[i];
            if(!data.hasOwnProperty(payload_key)) { continue }
            payload[payload_key] = data[payload_key]
          }
        }
        
        // Set Payload
        if(definition.method == "GET") {
          request_data.qs = payload
        } else {
          request_data.body = payload
        }
        
        // Make Request
        return request(request_data).catch(function(error) {
          for (var i = 0; i < error.error.messages.length; i++) {
            console.error(error.error.messages[i]);
          }
          
          process.exit(1);
        })
      }
    }
  }
  
  // Export Endpoints
  return endpoints
}
