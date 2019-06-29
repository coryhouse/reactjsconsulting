# ReactJSConsulting Dev Environment

## Quick Start

```
git clone https://github.com/coryhouse/reactjsconsulting reactjsconsulting
cd reactjsconsulting/dev-environment
npm i
npm start
```

This installs dependencies, and starts the app and mock API.

## Recommended Extensions

It's recommended to install the extensions listed in the .vscode directory. VS Code will automatically prompt you to install the extensions the first time you open the project.

This project uses [Prettier](https://prettier.io) to autoformat code via a pre-commit hook. It's recommended to also run the Prettier extension in VS Code and enable format on save:

1. Install the Prettier extension
1. Open VS Code settings
1. Search for "Format on save" and enable

## npm Scripts

| Script          | Description                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| start           | Start the app and [json-server](https://github.com/typicode/json-server) mock API                                                  |
| test            | Run automated unit tests via [Jest](https://jestjs.io) and [React Testing Library](https://github.com/kentcdodds/react-testing-library) |
| cypress         | Run automated integration tests via [Cypress](https://www.cypress.io/)                                                             |
| build           | Generate the production build                                                                                                      |
| storybook       | Run [Storybook](https://storybook.js.org/) to build components in isolation and view existing components                           |
| build-storybook | Build Storybook for production deployment (not currently hosted anywhere)                                                          |
| chromatic       | Run image tests on Storybook using [Chromatic](https://www.chromaticqa.com/)                                                       |

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Mock API

This project uses [json-server](https://github.com/typicode/json-server) as a mock API. It utilizes mock data in `/tools/mockData.js` to populate `db.json` when you run `npm start`. The `db.json` file simulates a database, so the mock API supports CRUD.
