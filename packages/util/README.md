# @polkadot/util

Various useful utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

## Usage

Installation -

```
yarn add @polkadot/util
```

Functions can be imported directly from the package, e.g.

```js
import { isHex } from '@polkadot/util';
```

## Documentation and Available Utilities

Below is a list of currently exposed methods published at the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/util/).

Utility methods for this package are split into groups, some of which are included in the list below:

- [util](https://polkadot.js.org/common/util/README.md)
  - Classes
    - [Error](https://polkadot.js.org/common/util/classes/_ext_error_.exterror.md)
  - Functions
    - [arrayFilter](https://polkadot.js.org/common/util/modules/_array_filter_.md)
    - [assert](https://polkadot.js.org/common/util/modules/_assert_.md)
    - [logger](https://polkadot.js.org/common/util/modules/_logger_.md)
    - [promisify](https://polkadot.js.org/common/util/modules/_promisify_.md)
    - [syncify](https://polkadot.js.org/common/util/modules/_syncify_.md)

Below is information about some of the available methods:

### Assert

* Checks for a valid test, if not `ExtError` is thrown

### Logger

* Creates a consistent log interface for messages that has `.log`, `.error`, `.warn` and `.debug` (controlled with environment `DEBUG=typeA,typeB`) methods.

### Promisify

* Wraps a supplied asynchronous callback function into a Promise, passing supplied parameters. When `error` is set, the Promise is rejected, else the Promise resolves with the `result` value.

### Syncify

* This is currently for Node environments only.
