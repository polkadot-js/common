

# Functions

<a id="blake2bashex"></a>

##  blake2bAsHex

▸ **blake2bAsHex**(data: *`Uint8Array` \| `string`*, bitLength?: *`number`*): `string`

*Defined in [blake2/blake2b/asHex.ts:23](https://github.com/polkadot-js/common/blob/4b1681d/packages/util-crypto/src/blake2/blake2b/asHex.ts#L23)*

*__name__*: blake2bAsHex

*__summary__*: Creates a blake2b hex string from the input.

*__description__*: From a `Uint8Array` input, create the blake2b and return the result as a hex string.

*__example__*:   

```javascript
import { blake2bAsHex } from '@polkadot/util-crypto';

blake2bAsHex('abc'); // => '0xba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923'
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | `Uint8Array` \| `string` | - |
| `Default value` bitLength | `number` | 512 |

**Returns:** `string`

___

