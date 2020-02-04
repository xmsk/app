# nffl

## Set up

After a clone of the source code repository, before a "run" or "build" task can be successfully run, the npm environment has to be set up:

```
npm install
```

## Run

If you haven't done so already, install the [Tabris CLI](https://www.npmjs.com/package/tabris-cli) on your machine:

```
npm i tabris-cli -g
```

Then in the project directory, type:

```
npm start
```
Or choose "npm: start" from the Visual Studio Code task runner to make compile errors appear in the "Problems" view.

This will start a Tabris.js code server at a free port and print its URL to the console. The app code can then be [side-loaded](https://tabrisjs.com/documentation/3.2/developer-app.html#run-your-app) in the [developer app](https://tabrisjs.com/documentation/3.2/developer-app.html) by entering that URL.

Alternatively you can also call the Tabris CLI directly:

```
tabris serve -a -w
```

This the same as running `npm start`. The `-w` switch starts the compiler in watch mode, meaning you do not have to re-start the server after each code change, and `-a` causes the app to reload automatically as well.

## Test

You can run compiler, linter and all unit tests with a single command:
```
npm test
```

Unit tests are executed with [Mocha](https://mochajs.org/) and located in the `test` directory. They can be run explicitly via:

```
npm run mocha
```

With the [Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) extensions individual tests can be triggered and monitored directly in Visual Studio Code.

This project also includes a TSLint configuration that helps preventing common mistakes in your code. Most IDEs can display TSLint-based hints directly in the editor, but you can also run the tool explicitly via:

```
npm run lint
```

## Build

The app can be built using the online build service at [tabrisjs.com](https://tabrisjs.com) or locally using [Tabris.js CLI](https://www.npmjs.com/package/tabris-cli).

See [Building a Tabris.js App](https://tabrisjs.com/documentation/3.2/build.html) for more information.

## Troubleshooting
### Decorator order
When using both the `@property` decorator of `Tabris` and the `@jsonMember` decorator of `TypedJSON` the order of the decorators is crucial!
This
```
@property
@jsonMember
public PlayerId: number;
```
works, this
```
@jsonMember
@property
public PlayerId: number;
```
doesn't.

UNDER NO CIRCUMSTANCES CHANGE THE ORDER OF THE DECORATORS...DEBUGGING TOOK 4 DAYS.