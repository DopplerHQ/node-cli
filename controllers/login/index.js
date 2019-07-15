const url = require("url")
const path = require("path")
const open = require("open")
const express = require("express")
const getPort = require("get-port")
const chalk = require("chalk")
const cors = require('cors')
const DefaultPort = 9876
const AllowedOrigins = new Set([
  "http://doppler.internal:3030",
  "https://staging.doppler.com",
  "https://doppler.com"
])


function task_runner(program, options) {
  const config = program.config.load()
  const app = express()

  getPort({ port: DefaultPort }).then((port) => {
    app.set("views", __dirname + "/views")
    app.set("view engine", "ejs")
    app.use(require("body-parser").json())


    // CORs
    app.use(cors((req, callback) => {
      const origin = req.header('origin') || req.header('referer').replace(/\/$/, "")

      if(origin !== undefined && AllowedOrigins.has(origin)) {
        return callback(null, true)
      }

      callback(new Error('Origin disallowed'))
    }))


    // Authorized Origins Check
    app.use((req, res, next) => {
      const origin = req.header('origin') || req.header('referer').replace(/\/$/, "")

      if(origin !== undefined && AllowedOrigins.has(origin)) {
        return next()
      }

      const error_message = `Unauthorized origin attempting login: ${origin}`
      console.log(chalk.red(error_message))
      res.render("unauthorized", { origin })
      server.close()
    })


    // Cancel Route
    app.get("/cancel", (req, res, next) => {
      console.log(chalk.yellow("Cancelling login..."))
      res.render("cancelled")
      server.close()
    })


    // Login Route
    app.post("/login", (req, res) => {
      if(typeof req.body.api_key !== "string" || req.body.api_key.length === 0) {
        return res.render("failure", { port })
      }

      config["*"].key = req.body.api_key
      program.config.write(config)
      res.render("success")
      server.close()
      program._events["command:setup"]()
    })

    // Start Listening
    const server = app.listen(port)

    // Open Browser
    console.log(chalk.yellow("Opening the browser to log you into Doppler..."))
    open(`https://doppler.com/workplace/auth/cli?port=${port}`)
  })
}


module.exports = function(program) {
  program
    .command("login")
    .description("login into Doppler on your computer")
    .action(function(options) {
      task_runner(program, options)
    });
}