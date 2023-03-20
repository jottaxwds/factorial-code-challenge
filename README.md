## Get started

This project needs Pre-requisites you may have to install on your local env. to run this project:
 - [`node`](https://nodejs.org/en/)
 - [`npm`](https://www.npmjs.com/)
 - [`json-server`](https://www.npmjs.com/package/json-server) globally -> `npm i -g json-server`

 You can install both npm/node at the same time and manage them by using [`nvm`](https://github.com/nvm-sh/nvm).

## How to run it?

- 1st intall dependencies both for client & server (running `npm i` on both)
- 2nd on `server` dir, run:
  - terminal 1:  `npm run start` -> It will run the backend on `localhost:3001` + generate `db.json` with first metrics data to be used within `json-server`.
  - **(this step not required when moved to real DB)** terminal 2: `npm run json-server-start`. It runs `json-server` as a 'data base' for this project on `localhost:3002`.
- 3rd on `client` dir run: `npm run start`. It will run Frontend client in `localhost:3000`.


## General overview

Due to the ambiguitus of the tas requirements in which 'metrics' can be understood in many different ways about data representation/handling, I decided to allow only `value` from `0 to 999`. In a normal basis, metrics must have sense and measure 'something' that should be displayed to users accordingly. This time is just mocked data with not much sense but fits the purposes of the challenge in terms of implement an application that handles them in a certain way.

As a way to display the averages and timeline, this project uses 3rd party libraries. The rest, are custom components in the project.

### Behaviour

`server` contains the required logic to get requests from `client` and fetch data from a `json-server` that acts as a database. I could be managing the `db.json` directly but I prefer to make something that can be connected through a real database without major improvements.

`client` consumes data from `server` in different ways: 
 - gets paginated & sorted metrics
 - gets averages from ALL the metrics above.
 - each update (post a new metric) requires to update pagination, total metrics & averages to be up-to-date with latest changes in the db.


## Technical overview:

### Server
Simple backend using node/express which exposes and endpoint with 3 different routes:
 - GET `/metrics/paginated`: Returns sorted metrics by given query parameters `page` (page number) & `pageSize`.
 - GET `/metrics/averages`: Returns averages by hour/day/minute about all available metrics data.
 - POST `metrics/save`: Adds new given metric to database

Unit tests are done by using `supertest` from the endpoint above.

## Frontend

This project uses `create-react-app` + `typescript` as the starting point. Also has a pre-configured `prettier/eslint` for codestyle checking.

The project is a SPA implemented over `App.tsx` and divided into different sections (containers):
 - Averages: Provides daily/hourly/minutly averages from data
 - Add Metric dialog: A way to add new metrics
 - Timeline: To data visualization

About state management, the project uses a context/provider pattern (`src/AppContext.tsx`) which is consumed by a specific hook `src/hooks/useMetrics.tsx`. That hook exposes also the methods required to update each part of the context (averages, metrics) and manages over-all loading state + do 1st init calls to get data first time. In terms of scalability other hooks can be created to consume other parts of the context and be responsible only to one specific part/thing from the Application.

Isolated, business-agnostic, components were created under `src/components` to handle different purposes of the application that consumes `theme` properties from `src/theme` in order to be easy moved into a Design System with design tokens (name of colour/spacings might be different but design system export of those was the intention).

Overall styling strategy is done by using `styled-components` which allows to consume whatever component props are needed (+ type checked by Typescript) to update styles regarding their values.

Unit test was done with React-testing-library.

