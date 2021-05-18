# SolidStream


## About

SolidStream is a training project aimed at learning React.js and Symfony by creating a simple fullstack web application allowing users to view as well as publish live video streams.

## Technologies
- PHP 7.4
- Npm 6.14.2
- Node.js 12.22.1
- Composer 1.10.1
- Symfony 5.2
- React 17.02
- Webpack, Encore
- React Player 2.9
- React Router 5.2


## Installation

You need to install dependancies:

Symfony Cli tool:

https://symfony.com/download

Composer:

https://getcomposer.org/download/

Npm:

`sudo apt-get install nodejs`



### Web application
1. Run `composer install`
2. Run `npm install`


### Streaming server

Follow the nginx.com tutorial on compiling nginx with rtmp modules:

https://www.nginx.com/blog/video-streaming-for-remote-learning-with-nginx/


## Running the application

To start, first either compile the front end SPA with either:

`npm run dev` or

`npm run watch` to set encore to auto-compile on code changes with 


Then, in a separate terminal, run symfony with:

`symfony server:start`
