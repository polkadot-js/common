

# Functions

<a id="fromnibbles"></a>

##  fromNibbles

▸ **fromNibbles**(input: *`Uint8Array`*): `Uint8Array`

*Defined in [util/fromNibbles.ts:20](https://github.com/polkadot-js/common/blob/3ee9e13/packages/trie-codec/src/util/fromNibbles.ts#L20)*

*__name__*: fromNibbles

*__signature__*: fromNibbles (nibbles: Uint8Array): Uint8Array

*__summary__*: Converts the input to Nibbles.

*__description__*: From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.

*__example__*:   

```javascript
import { fromNibbles } from '@polkadot/trie-codec/util';

fromNibbles(new Uint8Array([4, 1, 2, 0])); // => Uint8Array([0x41, 0x20]
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| input | `Uint8Array` |

**Returns:** `Uint8Array`

___

