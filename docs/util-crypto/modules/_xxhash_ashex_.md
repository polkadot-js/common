

# Functions

<a id="xxhashashex"></a>

##  xxhashAsHex

▸ **xxhashAsHex**(data: *`Buffer` | `Uint8Array` | `string`*, bitLength?: *`number`*): `string`

*Defined in [xxhash/asHex.ts:24](https://github.com/polkadot-js/common/blob/2d4097d/packages/util-crypto/src/xxhash/asHex.ts#L24)*

*__name__*: xxhashAsHex

*__signature__*: xxhashAsHex (data: Buffer | Uint8Array | string, bitLength: number = 64): string

*__summary__*: Creates a xxhash64 hex from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with the specified `bitLength`.

*__example__*:   

```javascript
import { xxhashAsHex } from '@polkadot/util-crypto';

xxhashAsHex('abc'); // => 0x44bc2cf5ad770999
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | `Buffer` | `Uint8Array` | `string` | - |
| `Default value` bitLength | `number` | 64 |

**Returns:** `string`

___

