# buffer

Utility methods to convert to and from `Buffer` objects 

- (bufferFromHex)[#bufferFromHex] Creates a Buffer object from a hex string.
- (bufferToHex)[#bufferToHex] Creates a hex value from a Buffer object.

## bufferFromHex

Creates a Buffer object from a hex string.

```js
bufferFromHex (value?: string): Buffer
```


`null` inputs returns an empty `Buffer` result. Hex input values return the actual bytes value converted to a Buffer. Anything that is not a hex string (including the `0x` prefix) throws an error.

```js
import { bufferFromHex } from '@polkadot/util';

console.log('Buffer object', bufferFromHex('0x123480001f'));
```

## bufferToHex

Creates a hex value from a Buffer object.

```js
bufferToHex (value?: Buffer): string
```


`null` inputs returns a `0x` result, `Buffer` values return the actual value as a `0x` prefixed hex value. Anything that is not a `Buffer` object throws an error.

```js
import { bufferToHex } from '@polkadot/util';

console.log('Hex value', bufferToHex(Buffer.from([1, 2, 3]));
```