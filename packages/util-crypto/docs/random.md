# random

Returns a sequence of secure random bytes in a variety of formats 

- [randomAsBuffer](#randomasbuffer) Creates a Buffer filled with random bytes.
- [randomAsHex](#randomashex) Creates a hex string filled with random bytes.
- [randomAsNumber](#randomasnumber) Creates a random number from random bytes.
- [randomAsU8a](#randomasu8a) Creates a Uint8Array filled with random bytes.

## randomAsBuffer

Creates a Buffer filled with random bytes. 

```js
randomAsBuffer (length?: number = 32): Buffer
```


Returns a `Buffer` with the specified (optional) length filled with random bytes.

```js
import { randomAsBuffer } from '@polkadot/util-crypto';

randomAsBuffer() // => Buffer([...])
```

## randomAsHex

Creates a hex string filled with random bytes. 

```js
randomAsHex (length?: number = 32): string
```


Returns a hex string with the specified (optional) length filled with random bytes.

```js
import { randomAsHex } from '@polkadot/util-crypto';

randomAsHex() // => 0x...
```

## randomAsNumber

Creates a random number from random bytes. 

```js
randomAsNumber (): number
```


Returns a random number generated from the secure bytes.

```js
import { randomAsNumber } from '@polkadot/util-crypto';

randomAsNumber() // => <random number>
```

## randomAsU8a

Creates a Uint8Array filled with random bytes. 

```js
randomAsU8a (length?: number = 32): Uint8Array
```


Returns a `Uint8Array` with the specified (optional) length filled with random bytes.

```js
import { randomAsU8a } from '@polkadot/util-crypto';

randomAsU8s() // => Uint8Array([...])
```