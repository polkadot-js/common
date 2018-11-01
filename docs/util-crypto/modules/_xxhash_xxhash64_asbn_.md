

# Functions

<a id="xxhash64asbn"></a>

##  xxhash64AsBn

▸ **xxhash64AsBn**(data: * `Buffer` &#124; `Uint8Array` &#124; `string`*, seed: *`number`*): `BN`

*Defined in [xxhash/xxhash64/asBn.ts:24](https://github.com/polkadot-js/common/blob/0ddac0a/packages/util-crypto/src/xxhash/xxhash64/asBn.ts#L24)*

*__name__*: xxhash64AsBn

*__signature__*: xxhash64AsBn (data: Buffer | Uint8Array | string, seed: number): BN

*__summary__*: Creates a xxhash BN from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a BN.

*__example__*:   

```javascript
import { xxhash64AsNumber } from '@polkadot/util-crypto';

xxhash64AsBn('abcd', 0xabcd)); // => new BN(0xe29f70f8b8c96df7)
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| data |  `Buffer` &#124; `Uint8Array` &#124; `string`|
| seed | `number` |

**Returns:** `BN`

___

