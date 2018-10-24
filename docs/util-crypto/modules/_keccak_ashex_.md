

# Functions

<a id="keccakashex"></a>

##  keccakAsHex

▸ **keccakAsHex**(value: * `Buffer` &#124; `Uint8Array` &#124; `string`*): `string`

*Defined in [keccak/asHex.ts:24](https://github.com/polkadot-js/common/blob/7153110/packages/util-crypto/src/keccak/asHex.ts#L24)*

*__name__*: keccakAsHex

*__signature__*: keccakAsHex (value: Buffer | Uint8Array | string): string

*__summary__*: Creates a keccak hex string from the input.

*__description__*: From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.

*__example__*:   

```javascript
import { keccakAsHex } from '@polkadot/util-crypto';

keccakAsHex('123'); // => 0x...
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `Buffer` &#124; `Uint8Array` &#124; `string`|

**Returns:** `string`

___

