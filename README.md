# test-app-wallet

[![Codeship Status for jazzy-em/test-app-wallet](https://app.codeship.com/projects/ad699730-5727-0137-3bbf-62c8855d79ff/status?branch=master)](https://app.codeship.com/projects/341640)

## What is it
JS-wallet application based on BitGo test API.
Backend part is node Express app, front-end part is React+Redux app.

To use it you should have/create account on [test.bitgo.com](http://test.bitgo.com/)

## Requirements
* node v>=8

## Installation
* `npm i`

## Run development version
Application by default uses port 8083 for webpack dev server and port 8093 for backend. You can change these ports in `config/development.json`.
To run webpack dev server and backend node server use:
* `npm start`
* Open in your browser `http://localhost:8083/`

## Run production version
Application by default uses 8090 port. You can change it in `config/production.json`.
To run production server use:
* `npm run production`
* Open in your browser `http://localhost:8090/`

## Test & coverage
To run test use:
* `npm run test`

To see coverage use:
* `npm run coverage`