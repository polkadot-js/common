# blake2

Create blake2b values with specified bitlengths 

- [blake2AsHex](#blake2ashex) Creates a blake2b hex from the input.
- [blake2AsHex128](#blake2ashex128) Creates a blake2b hex with 128-bits from the input.
- [blake2AsHex256](#blake2ashex256) Creates a blake2b hex with 256-bits from the input.
- [blake2AsHex512](#blake2ashex512) Creates a blake2b hex with 512-bits from the input.
- [blake2AsU8a](#blake2asu8a) Creates a blake2b u8a from the input.
- [blake2AsU8a128](#blake2asu8a128) Creates a blake2b u8a with 128-bits from the input.
- [blake2AsU8a256](#blake2asu8a256) Creates a blake2b u8a with 256-bits from the input.
- [blake2AsU8a512](#blake2asu8a512) Creates a blake2b u8a with 512-bits from the input.

## blake2AsHex

Creates a blake2b hex from the input. 

```js
blake2AsHex (data: Uint8Array, bitLenght: number = 64): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with the specified `bitLength`.

```js
import { blake2AsHex } from '@polkadot/util-crypto';

blake2AsHex('abc') // => 0xba80a53f981c4d0d
```

## blake2AsHex128

Creates a blake2b hex with 128-bits from the input. 

```js
blake2AsHex128 (data: Uint8Array): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with 128 bits.

```js
import { blake2AsHex128 } from '@polkadot/util-crypto';

blake2AsHex128('abc') // => 0x44bc2cf5ad770999
```

## blake2AsHex256

Creates a blake2b hex with 256-bits from the input. 

```js
blake2AsHex256 (data: Uint8Array): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with 256 bits.

```js
import { blake2AsHex256 } from '@polkadot/util-crypto';

blake2AsHex256('abc') // => 0x44bc2cf5ad770999
```

## blake2AsHex512

Creates a blake2b hex with 512-bits from the input. 

```js
blake2AsHex512 (data: Uint8Array): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with 512 bits.

```js
import { blake2AsHex512 } from '@polkadot/util-crypto';

blake2AsHex512('abc') // => 0x44bc2cf5ad770999
```

## blake2AsU8a

Creates a blake2b u8a from the input. 

```js
blake2AsU8a (data: Uint8Array, bitLenght: number = 64): Uint8Array
```


From a `Uint8Array` input, create the blake2b and return the result as a u8a with the specified `bitLength`.

```js
import { blake2AsU8a } from '@polkadot/util-crypto';

blake2AsU8a('abc') // => [0xba, 0x80, 0xa53, 0xf98, 0x1c, 0x4d, 0x0d]
```

## blake2AsU8a128

Creates a blake2b u8a with 128-bits from the input. 

```js
blake2AsU8a128 (data: Uint8Array): Uint8Array
```


From a `Uint8Array` input, create the blake2b and return the result as a Uint8Array with 128 bits.

```js
import { blake2AsU8a128 } from '@polkadot/util-crypto';

blake2AsU8a128('abc') // => 0x44bc2cf5ad770999
```

## blake2AsU8a256

Creates a blake2b u8a with 256-bits from the input. 

```js
blake2AsU8a256 (data: Uint8Array): Uint8Array
```


From a `Uint8Array` input, create the blake2b and return the result as a Uint8Array with 256 bits.

```js
import { blake2AsU8a256 } from '@polkadot/util-crypto';

blake2AsU8a256('abc') // => 0x44bc2cf5ad770999
```

## blake2AsU8a512

Creates a blake2b u8a with 512-bits from the input. 

```js
blake2AsU8a512 (data: Uint8Array): Uint8Array
```


From a `Uint8Array` input, create the blake2b and return the result as a Uint8Array with 512 bits.

```js
import { blake2AsU8a512 } from '@polkadot/util-crypto';

blake2AsU8a512('abc') // => 0x44bc2cf5ad770999
```