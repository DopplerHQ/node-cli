# Doppler Node.js Library

[![Version](https://img.shields.io/npm/v/doppler-cli.svg)](https://www.npmjs.org/package/doppler-cli)

The Doppler CLI provides a quick way to download a `.env` from Doppler.

## Installation

Install the CLI with:
``` bash
npm install doppler-cli -g
```

## Setting Credentials

Before starting to use the CLI, please create a `.doppler` file in your project. We **STRONGLY** recommend
adding the `.doppler` file to your `.gitignore` file so it is not tracked by git. 

``` bash
API_KEY = <DOPPLER_API_KEY>
PIPELINE = <PIPELINE ID>
```


## Useage

Downloading an `.env` file is easy with the CLI.

``` bash
doppler <ENVIRONMENT_NAME> <FILENAME>
```

Example:
``` bash
doppler development_primary development.env
```


## Output

``` bash
# Pipeline Name: Pied Piper Demo
# Pipeline Description: Video compression micro service.
# Environment Name: development_primary
# Last Updated: Sun Oct 07 2018 17:35:30 GMT-0700 (PDT)


USER=richard
S3_KEY=AKIAJCBLJXRPPC7Z7XYQ
APP_NAME=video-stream
GOOGLE_ID=102942803142-h643igr316bj0m9q09n14shg0hhodpq8.apps.googleusercontent.com
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


## Extra Information

- [Doppler](https://doppler.market)
- [API KEY](https://doppler.market/workplace/api_key)

