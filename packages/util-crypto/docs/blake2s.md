# blake2s

Create [Blake2s](https://blake2.net/) values as hex, Buffer & Uint8Array output 

- [blake2sAsBuffer](#blake2sasbuffer) Creates a blake2s Buffer from the input.
- [blake2sAsHex](#blake2sashex) Creates a blake2s hex string from the input.
- [blake2sAsU8a](#blake2sasu8a) Creates a blake2s Uint8Array from the input.

## blake2sAsBuffer

Creates a blake2s Buffer from the input. 

```js
blake2sAsBuffer (value: Uint8Array): Buffer
```


From a `Uint8Array` input, create the blake2s and return the result as a `Buffer`.

```js
import { blake2sAsBuffer } from '@polkadot/util-crypto';

blake2sAsBuffer('abc') // => Buffer.from('508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982', 'hex')
```

## blake2sAsHex

Creates a blake2s hex string from the input. 

```js
blake2sAsHex (value: Uint8Array): string
```


From a `Uint8Array` input, create the blake2s and return the result as a hex string.

```js
import { blake2sAsHex } from '@polkadot/util-crypto';

blake2sAsHex('abc') // => '0x508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982'
```

## blake2sAsU8a

Creates a blake2s Uint8Array from the input. 

```js
blake2sAsU8a (value: Uint8Array): Uint8Array
```


From a `Uint8Array` input, create the blake2s and return the result as a `Uint8Array`.

```js
import { blake2sAsU8a } from '@polkadot/util-crypto';

blake2sAsU8a('abc') // => Uint8Array('508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982')
```