

# Functions

<a id="encoder"></a>

##  encoder

▸ **encoder**(input: *`any`*): `Uint8Array`

*Defined in [encoder/index.ts:24](https://github.com/polkadot-js/common/blob/0ddac0a/packages/util-rlp/src/encoder/index.ts#L24)*

*__name__*: encoder

*__signature__*: encoder (input: any): Uint8Array

*__summary__*: Encodes the input value into RLP.

*__description__*: From an input, calculate the RLP and return the result as a `Uint8Array`.

*__example__*:   

```javascript
import { encode } from '@polkadot/util-rlp';

encode('dog'); // => [0x83, 0x64, 0x6f, 0x67]
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| input | `any` |

**Returns:** `Uint8Array`

___

