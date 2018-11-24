const utils = require("./utils")
const Doppler = require("doppler-client")


function task_runner(program, argument, options) {
  const credentials = utils.credentials(program)
  
  const doppler = new Doppler(credentials)
  const local_keys = utils.load_env(options.dotenv)
  var keys = doppler.remote_keys
  
  if(local_keys == null) {
    var send_keys = {}
    
    for (var key in local_keys) {
      if(!local_keys.hasOwnProperty(key)) continue
      
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
      path: "/environments/" + credentials.environment + "/track_keys",
    })
  }
  
  utils.runCommand(process.cwd(), argument, {
    env: keys
  })
}


module.exports = function(program) {

  program
    .command('local <COMMAND>')
    .option('-d, --dotenv <DOTENV FILEPATH>', 'override default lookup path (".env")', ".env")
    .description('run your app locally')
    .action(function(argument, options) {
      task_runner(program, argument, options)
    });
  
}
