

# Functions

<a id="keccakasu8a"></a>

##  keccakAsU8a

▸ **keccakAsU8a**(value: * `Buffer` &#124; `Uint8Array` &#124; `string`*): `Uint8Array`

*Defined in [keccak/asU8a.ts:22](https://github.com/polkadot-js/common/blob/24cd64c/packages/util-crypto/src/keccak/asU8a.ts#L22)*

*__name__*: keccakAsU8a

*__signature__*: keccakAsU8a (value: Buffer | Uint8Array | string): Uint8Array

*__summary__*: Creates a keccak Uint8Array from the input.

*__description__*: From either a `string` or a `Buffer` input, create the keccak and return the result as a `Uint8Array`.

*__example__*:   

```javascript
import { keccakAsU8a } from '@polkadot/util-crypto';

keccakAsU8a('123'); // => Uint8Array
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value |  `Buffer` &#124; `Uint8Array` &#124; `string`|

**Returns:** `Uint8Array`

___

