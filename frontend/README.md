<!-- @format -->

# Instructions

## Starting server backend

The backend for the assignment is located inside the the directory `E-commerce-application/backend`
at the root of the repository. There is more instructions inside `E-commerce-application/backend/README.md`

1. Setup/install backend

   - **this stage needs to be performed only once**
   - **you can skip this stage if the backend is already installed**
   - change working directory to `E-commerce-application/backend` and run `npm install`

2. Starting the backend server

   - change working directory to `E-commerce-application/backend` and run `npm start`
   - server listens on http://localhost:3001/

3. Stopping the assignment backend server
   - press <`Ctrl-C`> while the server is running

### Resetting database back to its initial state

1. change working directory to `E-commerce-application/backend`
2. inside `E-commerce-application/backend` directory run `npm run reset-db` to save initial
   test data (products and users) to the database
   (this replaces database contents with the freshly saved data)

## Setup the frontend

- change working directory to `E-commerce-application/frontend`
- run `npm install` to install all dependencies

## Run the frontend

- run `npm run frontend` to run the frontend in port 3000 and run it in watch mode.

## Test

- run `npm run test:e2e:dev` to run the end to end tests in interactive watch mode.
- run `npm run test:e2e` to run the end to end tests once in a non-interactive mode.
