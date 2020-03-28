# Angular DHIS2 Data validation library demo

Boilerplate codes to fast track developing DHIS2 applications based on Angular framework

## Prerequisites

1. [NodeJs (10 or higher)](https://nodejs.org)
2. npm (6.4.0 or higher), can be installed by running `apt install npm`
3. git, can be installed by running `apt install git`

## Setup

Clone repository

```bash
 git clone https://github.com/hisptz/ngx-dhis2-validation.git
```

Navigate to application root folder

```bash
cd ngx-dhis2-validation
```

Install all required dependencies for the app

```bash
npm install
```

## Development server

To start development server

`npm start`

Navigate to [http://localhost:4200](http://localhost:4200).

This command will require proxy-config.json file available in the root of your source code, usually this file has this format, but you need to get the format of the validations definitions to store in datastore of the instance with target in proxy file

```json
{
  "/api": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  },
  "/": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  }
}
```

## Build

Run `ng build ngx-dhis2-data-validation` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-dhis2-data-validation`, go to the dist folder `cd dist/ngx-dhis2-data-validation` and run `npm publish`.

## Running unit tests

Run `ng test ngx-dhis2-data-validation` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
