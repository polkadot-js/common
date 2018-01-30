# blake2

 

- [blake2AsHex](#blake2ashex) Creates a blake2b hex from the input.
- [blake2AsHex128](#blake2ashex128) Creates a blake2b hex with 128-bits from the input.
- [blake2AsHex256](#blake2ashex256) Creates a blake2b hex with 256-bits from the input.
- [blake2AsHex512](#blake2ashex512) Creates a blake2b hex with 512-bits from the input.

## blake2AsHex

Creates a blake2b hex from the input. 

```js
blake2AsHex (data: Uint8Array, bitLenght: number = 64): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with the specified `bitLength`.

```js
import { blake2AsHex } from '@polkadot/util-crypto';

blake2AsHex('abc')) // => 0xba80a53f981c4d0d
```

## blake2AsHex128

Creates a blake2b hex with 128-bits from the input. 

```js
blake2AsHex128 (data: Buffer): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with 128 bits.

```js
import { blake2AsHex128 } from '@polkadot/util-crypto';

blake2AsHex128('abc')) // => 0x44bc2cf5ad770999
```

## blake2AsHex256

Creates a blake2b hex with 256-bits from the input. 

```js
blake2AsHex256 (data: Buffer): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with 256 bits.

```js
import { blake2AsHex256 } from '@polkadot/util-crypto';

blake2AsHex256('abc')) // => 0x44bc2cf5ad770999
```

## blake2AsHex512

Creates a blake2b hex with 512-bits from the input. 

```js
blake2AsHex512 (data: Buffer): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with 512 bits.

```js
import { blake2AsHex512 } from '@polkadot/util-crypto';

blake2AsHex512('abc')) // => 0x44bc2cf5ad770999
```