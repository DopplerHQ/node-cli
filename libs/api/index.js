const axios = require("axios")
const chalk = require("chalk")


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

      endpoints[group_name][key] = function(input={}) {
        // Build Data
        var data = program.utils.load_credentials()

        for(var name in input) {
          if(!input.hasOwnProperty(name)) { continue }

          const value = input[name]

          if(value != null && value != undefined && !(typeof value == "number" && isNaN(value))) {
            data[name] = value
          }
        }

        // Build Request
        var request_data = {
          method: definition.method,
          url: program.host + definition.path(data),
          responseType: "json",
          headers: {
            "api-key": data.api_key,
            "client-sdk": "cli",
            "client-version": program.version(),
            "user-agent": `doppler cli ${program.version()}`
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
          request_data.params = payload
        } else {
          request_data.data = payload
        }

        // Make Request
        return axios(request_data).then((response) => {
          return response.data
        }).catch((error) => {
          if(error.code == "ENOTFOUND") {
            console.error(chalk.red("ERROR: Could not reach \"" + program.host + "\". Please make sure you are connected to the internet."))
          } else if(typeof error.error == "string") {
            console.error("ERROR: " + chalk.red(error.error))
          } else {
            for (var i = 0; i < error.response.data.messages.length; i++) {
              console.error(chalk.red("ERROR: " + error.response.data.messages[i]));
            }

            for (var i = 0; i < program.args.length; i++) {
              if(typeof program.args[i].help != "function") { continue }

              console.log("")
              program.args[i].help()
              break
            }
          }

          process.exit(1);
        })
      }
    }
  }

  // Export Endpoints
  return endpoints
}
