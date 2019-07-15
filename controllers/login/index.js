const path = require("path")
const open = require("open")
const express = require("express")
const getPort = require("get-port")
const chalk = require("chalk")


function task_runner(program, options) {
  const config = program.config.load()
  const app = express()

  getPort({ port: 9876 }).then(function(port) {
    app.use(require("body-parser").json())
    app.set("views", __dirname + "/views")
    app.set("view engine", "ejs")

    app.get("/login", function(req, res) {
      if(typeof req.query.api_key !== "string" || req.query.api_key.length === 0) {
        return res.render("failure", { port })
      }

      config["*"].key = req.query.api_key
      program.config.write(config)
      res.render("success")
      program._events["command:setup"]([...arguments])
    })

    const server = app.listen(port)
    console.log(chalk.yellow("Opening the browser to log you into Doppler..."))
    open("https://doppler.com/workplace/cli/auth?port=" + port)
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