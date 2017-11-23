# Available interfaces

Utility methods for this package are split into groups 

- [bn](bn.md) Utility methods to convert to and from `BN` objects
- [buffer](buffer.md) Utility methods to convert to and from `Buffer` objects
- [hex](hex.md) Internal utilities to create and test for hex values
- [is](is.md) Type checking utilities
- [jsonrpc](jsonrpc.md) Convenience functions for values from @polkadot/jsonrpc
- [keccak](keccak.md) Create Keccak256 values as hex, string & buffer output

# Available methods

## Logger

Creates a consistent log interface for messages

```js
logger (type: string): Logger
```


Returns a `Logger` that has `.log`, `.error` and `.warn` methods. Loggins is done with a consistent prefix (type of logger, date) followed by the actual message uning the underlying console.

```js
const l = require('@polkadot/util/logger')('test');

l.log('blah'); // <date>     TEST: blah
```