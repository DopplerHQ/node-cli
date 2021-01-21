# DEPRECATED AND NO LONGER FUNCTIONAL

This package is deprecated and no longer functional. Learn how to [migrate to the new CLI](https://docs.doppler.com/docs/saying-goodbye-to-the-doppler-client-packages-node-cli).

# Doppler Node.js Library

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/DopplerHQ/node-cli)
[![Version](https://img.shields.io/npm/v/@dopplerhq/cli.svg)](https://www.npmjs.org/package/doppler-cli)
[![Downloads](https://img.shields.io/npm/dm/@dopplerhq/cli.svg)](https://www.npmjs.com/package/doppler-cli)
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
  -k, --key <API KEY>                    override the API Key in configs
  --api-host <HOST URL>                  override Doppler's API host (default: "https://api.doppler.com")
  --deploy-host <HOST URL>               override Doppler's Deploy host (default: "https://deploy.doppler.com")
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


## Run App

Using the `run` command, specify the application you'd like to execute. The application will then be
executed with your Doppler secrets injected directly into the environment. This allows the application
to read your keys out of the environment using your language's built-in environment variable syntax
(e.g. `process.env.VAR_NAME`, `os.environ["VAR_NAME"]`, `os.Getenv("VAR_NAME")`, `System.getenv("VAR_NAME")`, etc). **This method
does not require any changes to your existing application and works with all languages and platforms.**

``` bash
doppler run -- node server.js

Options:
  -f, --fallback <DOTENV FILEPATH>  writes to this file on boot and read from it when you lose connection to the Doppler API.
  --fr, --fallback-readonly         treat the fallback file as read-only
  -p, --pipeline <id>               pipeline id
  -e, --environment <name>          environment name
  --                                interpret everything after this option as part of the command to run
  -h, --help                        output usage information
```

### Fallback Option
When the fallback option is enabled, the CLI will write to a `.env` file on boot and read from it when you lose connection to the Doppler API.

``` bash
doppler run --fallback="./fallback.env" -- python server.py
```

### Extra Examples
A few ways to use the CLI with popular programming languages:

``` bash
doppler run -- go run server.go # go

doppler run -- php artisan serve # php

doppler run -- java -jar Server.jar # java

doppler run -- node server.js # node.js

doppler run -- python server.py # python

doppler run -- ruby server.rb # ruby
```

## Extra Information

- [Doppler](https://doppler.com)
- [API KEY](https://doppler.com/workplace/api_key)
