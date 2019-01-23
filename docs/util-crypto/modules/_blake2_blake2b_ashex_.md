

# Functions

<a id="blake2bashex"></a>

##  blake2bAsHex

▸ **blake2bAsHex**(data: *`Uint8Array`*, bitLength?: *`number`*): `string`

*Defined in [blake2/blake2b/asHex.ts:24](https://github.com/polkadot-js/common/blob/5cb5390/packages/util-crypto/src/blake2/blake2b/asHex.ts#L24)*

*__name__*: blake2bAsHex

*__signature__*: blake2bAsHex (value: Uint8Array): string

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
| data | `Uint8Array` | - |
| `Default value` bitLength | `number` | 512 |

**Returns:** `string`

___

