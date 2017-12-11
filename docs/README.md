# Available interfaces

Utility methods for this package are split into groups 

- [array](array.md) Utility methods that operates on arrays
- [bn](bn.md) Utility methods to convert to and from `BN` objects
- [buffer](buffer.md) Utility methods to convert to and from `Buffer` objects
- [ext](ext.md) Extensions to basic classes
- [hex](hex.md) Internal utilities to create and test for hex values
- [is](is.md) Type checking utilities
- [jsonrpc](jsonrpc.md) Convenience functions for values from @polkadot/api-jsonrpc
- [keccak](keccak.md) Create Keccak256 values as hex, string & buffer output
- [number](number.md) Utility methods to convert to and from `number` values
- [u8a](u8a.md) Utility methods to convert to and from `Uint8Array` objects

# Available methods

## assert

Checks for a valid test, if not ExtError is thrown. 

```js
assert (test: any, message: string | () => string, code: number = ExtError.CODES.ASSERT, data: any): void
```


Checks that `test` is a truthy value. If value is falsy (`null`, `undefined`, `false`, ...), it throws an ExtError with the supplied `message` and an optional `code` and `data`. When `test` passes, `true` is returned.

```js
const assert = require('@polkadot/util/assert');

assert(true, 'True should be true'); // true returned
assert(false, 'False should not be true'); // ExtError thrown
assert(false, () => 'message'); // ExtError with 'message'
```

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