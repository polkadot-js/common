

# Functions

<a id="blake2ashex"></a>

##  blake2AsHex

▸ **blake2AsHex**(data: *`Uint8Array` \| `string`*, bitLength?: *`number`*): `string`

*Defined in [blake2/asHex.ts:21](https://github.com/polkadot-js/common/blob/6506c10/packages/util-crypto/src/blake2/asHex.ts#L21)*

*__name__*: blake2AsHex

*__summary__*: Creates a blake2b hex from the input.

*__description__*: From a `Uint8Array` input, create the blake2b and return the result as a hex string with the specified `bitLength`.

*__example__*:   

```javascript
import { blake2AsHex } from '@polkadot/util-crypto';

blake2AsHex('abc'); // => 0xba80a53f981c4d0d
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | `Uint8Array` \| `string` | - |
| `Default value` bitLength | `number` | 256 |

**Returns:** `string`

___

