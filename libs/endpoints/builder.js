const chalk = require("chalk")
const axios = require("axios")

const MAX_ATTEMPTS = 10
const BACKOFF_DELAY = 100
const STATUS_CODE_RETRY_RANGES = [
  // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
  // 1xx - Retry (Informational, request still processing)
  // 2xx - Do not retry (Success)
  // 3xx - Do not retry (Redirect)
  // 4xx - Do not retry (Client errors)
  // 429 - Retry ("Too Many Requests")
  // 5xx - Retry (Server errors)
  [100, 199],
  [429, 429],
  [500, 599]
]


module.exports = (program, host, definition_groups) => {
  // Build Endpoints
  const endpoints = {}

  for(const group_name of Object.keys(definition_groups)) {
    const definitions = definition_groups[group_name]
    endpoints[group_name] = {}

    // Build Requests per Defintion
    for(const key of Object.keys(definitions)) {
      const definition = definitions[key]

      endpoints[group_name][key] = build_endpoint(program, host, definition)
    }
  }

  // Export Endpoints
  return endpoints
}


const build_endpoint = (program, host, definition) => {
  const endpoint = (input={}, attempt=0) => {
    // Build Data
    const data = program.utils.load_credentials()

    for(const name of Object.keys(input)) {
      const value = input[name]

      if(value !== null && value !== undefined && !(typeof value === "number" && Number.isNaN(value))) {
        data[name] = value
      }
    }

    // Build Request
    const request_data = {
      method: definition.method,
      url: host + definition.path(data),
      responseType: "json",
      timeout: 1500,
      headers: {
        "api-key": data.api_key,
        "client-sdk": "cli",
        "client-version": program.version(),
        "user-agent": `doppler cli ${program.version()}`
      }
    }

    // Build Payload
    const payload = {}
    if(definition.hasOwnProperty("payload")) {
      for (let i = 0; i < definition.payload.length; i++) {
        const payload_key = definition.payload[i];
        if(!data.hasOwnProperty(payload_key)) { continue }
        payload[payload_key] = data[payload_key]
      }
    }

    // Set Payload
    if(definition.method === "GET") {
      request_data.params = payload
    } else {
      request_data.data = payload
    }

    // Make Request
    return axios(request_data).then((response) => {
      return response.data
    }).catch(async (error) => {
      if(should_retry(error, attempt)) {
        await backOffDelay(attempt)
        return endpoint(input, ++attempt)
      }

      if(!error.response) {
        console.error(chalk.red(`ERROR: Could not reach "${host}". Please make sure you are connected to the internet.`))
      } else if(typeof error.error === "string") {
        console.error(chalk.red(`ERROR: ${error.error}`))
      } else {
        for (let i = 0; i < error.response.data.messages.length; i++) {
          console.error(chalk.red(`ERROR: ${error.response.data.messages[i]}`))
        }

        console.error(chalk.yellow(`REQUEST ID: ${error.response.headers['x-request-id']}`))

        for (let i = 0; i < program.args.length; i++) {
          if(typeof program.args[i].help !== "function") { continue }

          console.log("")
          program.args[i].help()
          break
        }
      }

      if(definition.exit_on_error !== false) {
        process.exit(1);
      }

      return error.response
    })
  }

  return endpoint
}

const should_retry = (error, attempt) => {
  if(attempt >= MAX_ATTEMPTS) { return false }

  if (error.response && error.response.status) {
    let isInRange = false

    for (const [min, max] of STATUS_CODE_RETRY_RANGES) {
      const status = error.response.status
      if (status >= min && status <= max) {
        isInRange = true
        break
      }
    }

    return isInRange
  }

  return true
}

const backOffDelay = (attempt) => {
  return new Promise(resolve => {
    // Calculate time to wait with exponential backoff.
    // Formula: 2^c * Delay
    const delay = Math.pow(2, attempt) * BACKOFF_DELAY;
    setTimeout(resolve, delay)
  })
}