# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Userguide
Have a look at market-boomer-userguide.pdf in this repo for userguide

## Start the project in docker container

The simplest way to start. In the project directory, run:
### `docker compose up --build`
Starts the web and backend in a docker container.\
Wait for docker to start then visit [http://localhost:3000/todos](http://localhost:3000/todos) to view it in browser.

### `docker compose down`
Stop the docker container

## Start the project locally

In case you refer to the in locally instead of using Docker. In the project directory, run:
### `yarn start-server`

Runs the simple backend at [http://localhost:8080](http://localhost:8080)

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000/todos](http://localhost:3000/todos) to view it in your browser.

### `yarn test:coverage`

Launches the test runner.\
I tried to cover the core feature includes all the sagas and most UI
