

# Functions

<a id="numbertou8a"></a>

##  numberToU8a

▸ **numberToU8a**(value?: * `undefined` &#124; `number`*, bitLength?: *`number`*): `Uint8Array`

*Defined in [number/toU8a.ts:23](https://github.com/polkadot-js/common/blob/7188f6b/packages/util/src/number/toU8a.ts#L23)*

*__name__*: numberToU8a

*__signature__*: numberToU8a (value?: number, bitLenght: number = -1): Uint8Array

*__summary__*: Creates a Uint8Array object from a number.

*__description__*: `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `number` input values return the actual bytes value converted to a `Uint8Array`. With `bitLength`, it converts the value to the equivalent size.

*__example__*:   

```javascript
import { numberToU8a } from '@polkadot/util';

numberToU8a(0x1234); // => [0x12, 0x34]
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value |  `undefined` &#124; `number`| - |
| `Default value` bitLength | `number` |  -1 |

**Returns:** `Uint8Array`

___

