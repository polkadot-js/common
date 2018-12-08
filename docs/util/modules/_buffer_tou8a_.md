

# Functions

<a id="buffertou8a"></a>

##  bufferToU8a

▸ **bufferToU8a**(buffer?: * `Buffer` &#124; `number`[]*): `Uint8Array`

*Defined in [buffer/toU8a.ts:20](https://github.com/polkadot-js/common/blob/3de334c/packages/util/src/buffer/toU8a.ts#L20)*

*__name__*: bufferToU8a

*__signature__*: bufferToU8a (value?: Buffer): string

*__summary__*: Creates a Uint8Array value from a Buffer object.

*__description__*: `null` inputs returns an empty result, `Buffer` values return the actual value as a `Uint8Array`. Anything that is not a `Buffer` object throws an error.

*__example__*:   

```javascript
import { bufferToU8a } from '@polkadot/util';

bufferToU8a(Buffer.from([1, 2, 3]));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` buffer |  `Buffer` &#124; `number`[]|

**Returns:** `Uint8Array`

___

