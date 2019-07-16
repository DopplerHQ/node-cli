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
    app.use(require("body-parser").urlencoded({ extended: false }))


    // CORs
    app.use(cors({
      origin: (origin, callback) => {
        if(origin !== undefined && AllowedOrigins.has(origin)) {
          return callback(null, true)
        }

        callback(new Error('Unauthorized Origin'))
      }
    }))


    // Authorized Origins Check
    app.use((req, res, next) => {
      const origin = req.header('origin')

      if(origin !== undefined && AllowedOrigins.has(origin)) {
        return next()
      }

      console.log(chalk.red(`Unauthorized origin attempting login: ${origin}`))
      res.render("unauthorized", { origin })
      server.close()
    })


    // Cancel Route
    app.post("/cancel", (req, res, next) => {
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
    const login_url = `${options.provider}/workplace/auth/cli?port=${port}`
    console.log(chalk.yellow("Opening the browser to log you into Doppler..."))
    console.log(chalk.yellow(`If the browser did not open, please go this url: ${login_url}`))
    open(login_url)
  })
}


module.exports = function(program) {
  program
    .command("login")
    .description("login into Doppler on your computer")
    .option("--provider <domain>", "hostname of login server when using on-prem", "https://doppler.com")
    .action(function(options) {
      task_runner(program, options)
    });
}