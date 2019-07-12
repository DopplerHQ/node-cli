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

  local [options] <COMMAND>              run your app locally
  
  workplace [options]                    workplace information
  
  logs [options]                         workplace activity logs
  
  pipelines [options]                    list of pipelines
  
  stages [options]                       list of a pipelines's stages
  
  environments [options]                 list of environments in pipeline
  
  variables [options]                    view all variables in environment
  
  update                                 update the Doppler cli
  

```


## First Time Setup

The first thing you will want to do is set your Doppler API key, which is found on the [API Key](https://doppler.com/workplace/api_key) page.

``` bash
doppler config:set key=<YOUR DOPPLER API KEY>
```

Next let's set the pipeline id and environment name for your project. You should be 
in your project's root directory so that we can scope the credentials to your project.
Now when you change project folders, your Doppler credentials will update too.

``` bash
doppler config:set --scope=. pipeline=<PIPELINE ID> environment=<ENVIRONMENT NAME>
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
