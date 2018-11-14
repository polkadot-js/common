

# Functions

<a id="u8atou8a"></a>

##  u8aToU8a

▸ **u8aToU8a**(value?: * `Array`<`number`> &#124; `Buffer` &#124; `Uint8Array` &#124; `string` &#124; `null`*): `Uint8Array`

*Defined in [u8a/toU8a.ts:28](https://github.com/polkadot-js/common/blob/dc07e26/packages/util/src/u8a/toU8a.ts#L28)*

*__name__*: u8aToU8a

*__signature__*: u8aToU8a (value?: Array | Buffer | Uint8Array | string | null): Uint8Array

*__summary__*: Creates a Uint8Array value from a Uint8Array bignumber or hex input.

*__description__*: `null` inputs returns a `[]` result, Uint8Array values returns the value, hex strings returns a Uint8Array representation.

*__example__*:   

```javascript
import { u8aToU8a } from '@polkadot/util';

u8aToU8a(new Uint8Array([0x12, 0x34]); // => Uint8Array([0x12, 0x34])
u8aToU8a(0x1234); // => Uint8Array([0x12, 0x34])
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` value |  `Array`<`number`> &#124; `Buffer` &#124; `Uint8Array` &#124; `string` &#124; `null`|

**Returns:** `Uint8Array`

___

