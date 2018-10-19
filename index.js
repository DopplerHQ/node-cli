#!/usr/bin/env node
const request = require("request-promise")
const path = require("path")
const fs = require("fs")
const config = require('dotenv').config({ 
  path: path.resolve(process.cwd(), '.doppler') 
})
const args = process.argv.slice(2)

// Check Inputs
if(config.parsed == null) {
  return console.error(
    "Please create a .doppler file in this directory with your API key and pipeline ID.\n\n" +   
    "API_KEY = <DOPPLER_API_KEY>\n" +
    "PIPELINE = <PIPELINE ID>\n"
  )
}

if(!args[0]) {
  return console.error(
    "Missing environment name: doppler <ENVIRONMENT> <OUTPUT_PATH>"
  )
}

if(!args[1]) {
  return console.error(
    "Missing output file name: doppler <ENVIRONMENT> <OUTPUT_FILE_NAME>"
  )
}

// Download file
request({
  method: "GET",
  headers: {
    "api-key": config.parsed.API_KEY,
    "pipeline": config.parsed.PIPELINE
  },
  url: (process.env.DOPPLER_HOST || "https://api.doppler.market") + "/environments/" + args[0] + "/download",
}).then(function(response) {
  // Write to .env
  fs.writeFileSync(path.resolve(process.cwd(), args[1]), response)

}).catch(function(response) {
  if(!response || !response.messages) return
  response.messages.forEach(function(error) {
    console.error(error)
  })
})
