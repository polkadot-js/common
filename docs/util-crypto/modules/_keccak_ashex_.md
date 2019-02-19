

# Functions

<a id="keccakashex"></a>

##  keccakAsHex

▸ **keccakAsHex**(value: *`Buffer` \| `Uint8Array` \| `string`*): `string`

*Defined in [keccak/asHex.ts:23](https://github.com/polkadot-js/common/blob/e19d377/packages/util-crypto/src/keccak/asHex.ts#L23)*

*__name__*: keccakAsHex

*__summary__*: Creates a keccak hex string from the input.

*__description__*: From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.

*__example__*:   

```javascript
import { keccakAsHex } from '@polkadot/util-crypto';

keccakAsHex('123'); // => 0x...
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `Buffer` \| `Uint8Array` \| `string` |

**Returns:** `string`

___

