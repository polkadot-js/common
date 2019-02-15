

# Functions

<a id="u8atou8a"></a>

##  u8aToU8a

▸ **u8aToU8a**(value?: *`Array`<`number`> | `Buffer` | `Uint8Array` | `string` | `null`*): `Uint8Array`

*Defined in [u8a/toU8a.ts:27](https://github.com/polkadot-js/common/blob/9f9ceff/packages/util/src/u8a/toU8a.ts#L27)*

*__name__*: u8aToU8a

*__summary__*: Creates a Uint8Array value from a Uint8Array bignumber or hex input.

*__description__*: `null` inputs returns a `[]` result, Uint8Array values returns the value, hex strings returns a Uint8Array representation.

*__example__*:   

```javascript
import { u8aToU8a } from '@polkadot/util';

u8aToU8a(new Uint8Array([0x12, 0x34]); // => Uint8Array([0x12, 0x34])
u8aToU8a(0x1234); // => Uint8Array([0x12, 0x34])
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | `Array`<`number`> | `Buffer` | `Uint8Array` | `string` | `null` |

**Returns:** `Uint8Array`

___

