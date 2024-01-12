# ONgDB Browser

ONgDB Browser is a fork of Neo4j Browser and is the general purpose graphical user interface for working with ONgDB. Query, visualize, administrate and monitor the database
with modern and easy-to-use tools.

![ongdb browser screenshot](./.github/ongdb-browser-screenshot.png)

## Feedback & Contributing

Found a bug or some other problem with ONgDB Browser? Please [**open an issue**](https://github.com/graphfoundation/ongdb-browser/issues).

Contributions welcome! More information in our [CONTRIBUTING.md](CONTRIBUTING.md).

## Project structure

`yarn e2e` to run the cypress js test suite (requires a **fresh** installation of ongdb to run against, expects ongdb 2.0 by default).
`yarn e2e --env server=1.0` to only run cypress js tests valid for ongdb server version 1.0.

To run on an existing server (with a password already set), you can use any of these (the default password is set to "newpassword", pass in `--env browser-password=your-password`): 
`yarn e2e-local --env server=2.0` 
`yarn e2e-local-open --env server=2.0` 
The latter just opens Cypress runner, so you can see the tests being executed and run only some of them. Very useful when writing tests.

There are also e2e tests that cover import from CSV files. To run these, copy the `e2e_tests/files/import.csv` to the `import/` directory of the database you want to run the tests on and then start the e2e tests with the `--env include-import-tests=true` flag.
Example: `yarn e2e-local-open --env server=2.0,include-import-tests=true`

Browser has a subproject of re-usable components bundled together and exposed as `neo4j-arc`. Rather than set up mono-repo tooling, we've set up eslint to isolate `neo4j-arc` and given it a separate build step. Code in browser can only to import code from `neo4j-arc` through `neo4j-arc` aliases (as if it was a separate project) and `neo4j-arc` is not allowed to import any code from outside its own folder.

## Development

Running ONgDB Browser locally requires Node.js (^12.4.0) and for dependencies we use yarn (`npm install -g yarn`).
To install dependencies and then start the development server at `http://localhost:8080`:

```shell
yarn install
yarn start
```

Or to run in production mode:

```shell
yarn start-prod
```

### Testing overview

ONgDB Browser has both unit and end to end tests running automatically on every pull request. To run the tests locally:

`yarn test-unit` runs a linter and then our unit tests.

`yarn test-e2e` runs our Cypress end to end tests in the easiest, slowest way. Running them with this command requires docker installed and that nothing else runs on ports 7687 and 8080.

#### Cypress e2e test suite in depth

`yarn e2e-open` to open the Cypress test runner (requires a **fresh** installation of ONgDB to run against, expects ongdb 2.0 by default). See details below on how to configure database version.

`yarn e2e-local-open` to run against an existing server (with a password already set). We use `newpassword` as the default password here, make sure to pass your password:
`yarn e2e-local-open --env browser-password=<your-password-here>`

To avoid opening the Cypress test runner and just run the tests in the terminal, remove the "-open" suffix from the previous two commands (so `yarn e2e` and `yarn e2e-local` respectively).

So to run tests on your existing 2.0 database with the password "hunter2" without opening the Cypress visual test runner:
`yarn e2e-local --env browser-password=hunter2,server=2.0`

All the available options for `--env` are:

```
server=1.0|2.0 (default 2.0)
edition=enterprise|community (default enterprise)
browser-password=<your-pw> (default 'newpassword')
include-import-tests=true|false (default false)
bolt-url=<bolt url excluding the protocol> (default localhost:7687)
```

There are some additional options that can only be set as system environmental variables (meaning they cannot be set using the `--env` flag as the ones above).
These needs to be set before the test command is run.

```
CYPRESS_E2E_TEST_ENV=local|null (if the initial set of pw should run or not) (default undefined)
CYPRESS_BASE_URL=<url to reach the browser to test> (default http://localhost:8080)
```

Example: `CYPRESS_E2E_TEST_ENV="local" CYPRESS_BASE_URL=http://localhost:30000 cypress open --env server=2.0`

## Devtools

Redux and React have useful devtools, the chrome versions are linked below: 

- [Redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- [React devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## Building

### Install tools

Install yarn globally (not homebrew if using osx)

```
npm install -g yarn
```

### Installing

Yarn will build the distribution and package into a jar. That jar will then be bundled by Maven into the full artifact that many be used by ongdb.

It's important to not use the `clean` goal when running `mvn` as it will remove the jar created in the prior steps.

```
yarn
yarn build
yarn prepare-jar
mvn -o install -Duser.name=graphfoundation
```

## Unaffiliated with Neo4j, Inc.
ONgDB is an independent fork of Neo4j® Enterprise Edition version 3.4.0.rc02 licensed under the AGPLv3 and/or Community Edition licensed under GPLv3.
ONgDB and Graph Foundation, Inc. are not affiliated in any way with Neo4j, Inc. or Neo4j Sweden AB.
Neo4j, Inc. and Neo4j Sweden AB do not sponsor or endorse ONgDB and Graph Foundation, Inc.
Neo4j Sweden AB is the owner of the copyrights for Neo4j® software and commercial use of any source code from Neo4j® Enterprise Edition beyond
Neo4j® Enterprise Edition version 3.2.14, Neo4j® Enterprise Edition version 3.3.10, and/or Neo4j® Enterprise Edition version 3.4.0.rc02 is prohibited
and could subject the user to claims of copyright infringement.
