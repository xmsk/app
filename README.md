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

### Ghost cells
When we add (`.push()`) items to a `List` that is used as the `items` property of a `ListView`, we get the problem that we have ghost cells that have an undefined `item` and do not display anything.
In order to circumvent this problem we have to create a completely new list and reassign the `items` property of the `ListView`.

### Network request failiures
There are several possibilities why a network request can fail.
The obviouse ones such as no connection to the endpoint (no internet/not in intranet) are not discussed here.

The annoying thing with network request failures is that the error message is always basically the same and we have no good way of debugging it.
One way to test network requests is via the debug console in the ready built app tusing the `fetch` method.
Another annoying particularity is that things that work in the developer app do not necessarily work in the finished app.

#### HTTP connection
The Tabris app when it is built does not work for `HTTP` requests, only `HTTPS` requests.
The only known way to solve the problem is to enable `HTTPS` on the endpoint, e.g. by placing it behind a reverse proxy like `nginx`.

#### Redirect
The `flask` endpoint will send a redirect when the trailing slash of the request and endpoint do not match (one hsa a trailing slash and the other doesn't).
The native Tabris app cannot seem to handle redirects and will fail with a network request error if it receives a redirect response.
In order to solve the problem all `flask` endpoints have been defined **with** a trailing slash and the calls from the front end have been adjusted to include a trailing slash, as well.