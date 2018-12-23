# Doppler Node.js Library

[![Version](https://img.shields.io/npm/v/doppler-cli.svg)](https://www.npmjs.org/package/doppler-cli)
[![Downloads](https://img.shields.io/npm/dm/doppler-cli.svg)](https://www.npmjs.com/package/doppler-cli)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fe58518fd26a49aaaf218a6d6838e5af)](https://www.codacy.com/app/Doppler/cli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DopplerHQ/cli&amp;utm_campaign=Badge_Grade)

The Doppler CLI provides convenient access to the Doppler API from
applications written for **only** server-side code.

## Installation

Install the CLI with:

``` bash
npm install -g doppler-cli
```

## Setting Credentials

Before starting to use the CLI, please create a `.doppler` file in your project. We **STRONGLY** recommend
adding the `.doppler` file to your `.gitignore` file so it is not tracked by git. 

``` bash
API_KEY = <DOPPLER_API_KEY>
PIPELINE = <PIPELINE ID>
ENVIRONMENT = <ENVIRONMENT NAME>
```

You can also set the credentials as arguments

``` bash
doppler -k <DOPPLER_API_KEY> -p <PIPELINE ID> -e <ENVIRONMENT NAME> local "node server.js"
```

## Useage

``` bash
Usage: doppler [options] [command]

Options:
  -V, --version              output the version number
  -k, --key <API KEY>        override API key from ".doppler" file
  -e, --environment <NAME>   override environment from ".doppler" file
  -p, --pipeline <ID>        override pipeline from ".doppler" file
  -h, --help                 output usage information

Commands:
  local [options] <COMMAND>  run your app locally
  download <PATH>            download an environment's dotenv file
```

## Run Locally

The cli can inject your Doppler environments keys through the `local` command. Your
application will then be able to pull your keys natively.

``` bash
doppler local "node server.js"
``` 

## Download Dotenv

You can download an environment's keys into a dotenv file with the `download` command.

``` bash
doppler download ./backup.env
``` 

### Output

``` bash
USER=richard
S3_KEY=AKIAJCBLJXRPPC7Z7XYQ
APP_NAME=video-stream
GOOGLE_ID=1029428031429n14shg0hhodpq8.apps.googleusercontent.com
REDIS_URL=redis://richard@anton.localhost:6379
S3_SECRET=dyDcE2EQD68FeA0au41rJBhR+GdsmBtcjXhlw
MONGODB_URI=mongodb://richard@localhost/video-stream
SEGMENT_KEY=1AKshMoWK9owqlZWafhY6bOJP9o5DK
DATABASE_URL=postgres://richard@anton.local:5432/video-stream
CLOUDAMQP_URL=amqp://richard@anton.local
COOKIES_SECRET=mfcfdgb2gaa3077598hgilj155ni38539550cb0dimbi1d60i28nbb579ci7if495c3bejbek8i1ab
BUGSNAG_API_KEY=33d3587193a0f2fef7a27
SENDGRID_API_KEY=SG.hQ46NBfgRqSfFyuK_3tIMg.HfKdKxhQN8yghwz6XTzqIcNv8d0kMWlmbkkFJA
```

### PHP Htaccess Format

You can also download an environment's keys into a `.htaccess` file format for PHP users.

``` bash
doppler download ./backup.htaccess --htaccess
```

### Htaccess Output

``` bash
SetEnv USER "richard"
SetEnv S3_KEY "AKIAJCBLJXRPPC7Z7XYQ"
SetEnv APP_NAME "video-stream"
``` 

## Extra Information

- [Doppler](https://doppler.com)
- [API KEY](https://doppler.com/workplace/api_key)
