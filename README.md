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

  login                                  login into Doppler on your computer

  setup [options]                        setup local development for a pipeline

  config                                 view config variables

  run [options] <COMMAND>                run your app with variables from Doppler

  workplace [options]                    workplace information

  logs [options]                         workplace activity logs

  pipelines [options]                    list of pipelines

  stages [options]                       list of a pipelines's stages

  environments [options]                 list of environments in pipeline

  variables [options]                    view all variables in environment

  update                                 update the Doppler cli


```


## Development Setup

The first thing you will want to do is login into the CLI in the **root directory** of your project.

``` bash
doppler config:set key=<DOPPLER API KEY>
```

Now let's setup your project's directory to use Doppler. Please make sure you are in the
**root directory** of the project.

``` bash
doppler setup
```


## Production Setup

Using the CLI to fetch environment variables in production is super easy! Let's set your
Doppler credentials so your machine can communicate with Doppler.

``` bash
doppler config:set key=<DOPPLER API KEY> pipeline=<PIPELINE ID> environment=<ENVIRONMENT NAME>
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
