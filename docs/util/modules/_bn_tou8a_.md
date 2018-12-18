

# Functions

<a id="bntou8a"></a>

##  bnToU8a

▸ **bnToU8a**(value: * `BN` &#124; `number`*, bitLength: *`number`*, isLe: *`boolean`*): `Uint8Array`

*Defined in [bn/toU8a.ts:26](https://github.com/polkadot-js/common/blob/6d8e788/packages/util/src/bn/toU8a.ts#L26)*

*__name__*: bnToU8a

*__signature__*: bnToU8a (value?: BN | number, bitLength: number = -1, isLE: boolean = false): Uint8Array

*__summary__*: Creates a Uint8Array object from a BN.

*__description__*: `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `BN` input values return the actual bytes value converted to a `Uint8Array`. Optionally convert using little-endian format if `isLE` is set.

*__example__*:   

```javascript
import { bnToU8a } from '@polkadot/util';

bnToU8a(new BN(0x1234)); // => [0x12, 0x34]
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value |  `BN` &#124; `number`|
| bitLength | `number` |
| isLe | `boolean` |

**Returns:** `Uint8Array`

___

