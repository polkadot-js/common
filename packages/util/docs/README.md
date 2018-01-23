# Available interfaces

Utility methods for this package are split into groups

- [array](array.md) Utility methods that operates on arrays
- [bn](bn.md) Utility methods to convert to and from `BN` objects
- [buffer](buffer.md) Utility methods to convert to and from `Buffer` objects
- [ext](ext.md) Extensions to basic classes
- [hex](hex.md) Internal utilities to create and test for hex values
- [is](is.md) Type checking utilities
- [jsonrpc](jsonrpc.md) Convenience functions for values from @polkadot/api-jsonrpc
- [number](number.md) Utility methods to convert to and from `number` values
- [string](string.md) Utility methods to convert to work with `string` values
- [u8a](u8a.md) Utility methods to convert to and from `Uint8Array` objects

# Available methods

## assert

Checks for a valid test, if not ExtError is thrown.

```js
assert (test: mixed, message: string | () => string, code: number = ExtError.CODES.ASSERT, data: mixed): void
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


Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (constrolled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.

```js
const l = require('@polkadot/util/logger')('test');

l.log('blah'); // <date>     TEST: blah
```

## promisify

Wraps an async callback into a `Promise`

```js
function promisify (this: ?Object, fn: Function, ...params: Array<mixed>): Promise<any>
```


Wraps the supplied async function `fn` that has a standard JS callback `(error: Error, result: any)` into a `Promise`, passing the supplied parameters. When `error` is set, the Promise is rejected, else the Promise resolves with the `result` value.

```js
const promisify = require('@polkadot/util/promisify');

await promisify(null, ((a, cb) => cb(null, a), true); // resolves with `true`
await promisify(null, (cb) => cb(new Error('error!'))); // rejects with `error!`
```
