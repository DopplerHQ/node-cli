# Doppler Node.js Library

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/DopplerHQ/cli)
[![Version](https://img.shields.io/npm/v/doppler-cli.svg)](https://www.npmjs.org/package/doppler-cli)
[![Downloads](https://img.shields.io/npm/dm/doppler-cli.svg)](https://www.npmjs.com/package/doppler-cli)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fe58518fd26a49aaaf218a6d6838e5af)](https://www.codacy.com/app/Doppler/cli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DopplerHQ/cli&amp;utm_campaign=Badge_Grade)

The Doppler CLI provides convenient access to the Doppler API from
applications written for **only** server-side code.

## Installation

Install the CLI with:

``` bash
npm install -g @dopplerhq/cli
```

## CLI Commands

Here is a list of commands the Doppler CLI offers:

``` text
Usage: doppler [options] [command]

Options:
  -V, --version                          output the version number
  -k, --key <API KEY>                    override API key from '.doppler' file
  -h, --host <HOST URL>                  override Doppler API host (default: "https://api.doppler.com")
  -h, --help                             output usage information

Commands:
  
  config                                 view config variables
  config:set <name> <value>              set config variables
  config:unset <name>                    set config variables
  
  local [options] <COMMAND>              run your app locally
  
  workplace [options]                    workplace information
  workplace:update [options]             update workplace
  
  logs [options]                         workplace activity logs
  logs:view [options]                    specific workplace activity log
  
  pipelines [options]                    list of pipelines
  pipelines:create [options]             create a new pipeline
  pipelines:delete [options]             delete the pipeline
  pipelines:view [options]               pipeline information
  pipelines:update [options]             update a pipeline
  
  stages [options]                       list of a pipelines's stages
  stages:view [options]                  stage information
  stages:variables [options]             stage's default variables
  stages:variables:one [options] <name>  stage's specific default variable
  stages:variables:set [options]         set stage's default variables
  stages:variables:unset [options]       unset stage's default variables
  
  environments [options]                 list of environments in pipeline
  environments:create [options]          create a new pipeline
  environments:delete [options]          delete environment
  environments:view [options]            environment information
  environments:update [options]          update a environment
  environments:logs [options]            environment audit logs
  environments:logs:view [options]       specific environment audit log
  environments:logs:rollback [options]   rollback environment audit log
  environments:logs:diff [options]       diff of environment audit log
  
  variables [options]                    view all variables in environment
  variables:one [options] <name>         view specific variable in environment
  variables:download [options] <path>    download an environment's dotenv file
  variables:set [options]                set variable in environment
  variables:unset [options]              unset variable in environment
  variables:ignore [options]             view all ignored variables in environment
  variables:ignore:set [options]         set variable to ignore in environment
  variables:ignore:unset [options]       unset variable to ignore in environment
  
  links:dashboard                        open the Doppler dashboard in your browser
  links:slack                            join our Slack community in your browser
  links:github                           contribute to our open soure repos on Github in your browser
  
  update                                 update the Doppler cli
  

```


## First Time Setup

The first thing you will want to do is set your Doppler API key, which is found on the [API Key](https://doppler.com/workplace/api_key) page.

``` bash
doppler config:set key <YOUR DOPPLER API KEY>
```

You may also want to set a default pipeline and environment.

``` bash
doppler config:set pipeline 110
doppler config:set environment dev_primary
```

## Run Locally

The cli can inject your Doppler environments keys through the `local` command. Your
application will then be able to pull your keys natively. **The CLI works great on all
languages and programs.**

``` bash
doppler local "node server.js"

Options:
  -f, --fallback <DOTENV FILEPATH>  writes to this file on boot and reads from it when you lose connection to the Doppler API.
  -h, --help                        output usage information
``` 

### Fallback Option
When the fallback option is enabled, the CLI will write to a `.env` file on boot and reads from it when you lose connection to the Doppler API.

``` bash
doppler local "python server.py" --fallback="./fallback.env"
```

### Extra Examples
Few ways to use the CLI with popular programming languages:

``` bash
doppler local "go run server.go" # go

doppler local "php artisan serve" # php

doppler local "java -jar Server.jar" # java

doppler local "node server.js" # node.js

doppler local "python server.py" # python

doppler local "ruby server.rb" # ruby
```

## Extra Information

- [Doppler](https://doppler.com)
- [API KEY](https://doppler.com/workplace/api_key)
