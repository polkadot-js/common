

# Functions

<a id="encoder"></a>

##  encoder

▸ **encoder**(input: *`any`*): `Uint8Array`

*Defined in [encoder/index.ts:23](https://github.com/polkadot-js/common/blob/63daf66/packages/util-rlp/src/encoder/index.ts#L23)*

*__name__*: encoder

*__summary__*: Encodes the input value into RLP.

*__description__*: From an input, calculate the RLP and return the result as a `Uint8Array`.

*__example__*:   

```javascript
import { encode } from '@polkadot/util-rlp';

encode('dog'); // => [0x83, 0x64, 0x6f, 0x67]
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| input | `any` |

**Returns:** `Uint8Array`

___

