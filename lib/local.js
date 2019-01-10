const utils = require("./utils")
const Doppler = require("doppler-client")


function task_runner(program, argument, options) {
  const doppler = utils.doppler(program, options.fallback)
  
  const local_keys = utils.load_env(options.dotenv)
  var keys = doppler.remote_keys
  
  if(local_keys == null) {
    var send_keys = {}
    
    for (var key in local_keys) {
      if(!local_keys.hasOwnProperty(key)) { continue }
      
      if(local_keys[key] !== keys[key]) {
        send_keys[key] = local_keys[key]
      }
      
      if(!keys.hasOwnProperty(key)) {
        keys[key] = local_keys[key]
      }
    }
    
    doppler.request({
      method: "POST",
      body: { 
        local_keys: send_keys
      },
      json: true,
      path: "/environments/" + doppler.environment + "/track_keys",
    })
  }
  
  utils.runCommand(process.cwd(), argument, {
    env: keys
  })
}


module.exports = function(program) {

  program
    .command("local <COMMAND>")
    .option("-d, --dotenv <DOTENV FILEPATH>", "pull local keys to track from your '.env' file", ".env")
    .option("-f, --fallback <DOTENV FILEPATH>", "writes to this file on boot and reads from it when you loose connection to the Doppler API.")
    .description("run your app locally")
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
  
}
