

# Functions

<a id="tonibbles"></a>

##  toNibbles

▸ **toNibbles**(input?: * `Uint8Array` &#124; `null`*): `Uint8Array`

*Defined in [util/toNibbles.ts:20](https://github.com/polkadot-js/common/blob/9fc3354/packages/trie-codec/src/util/toNibbles.ts#L20)*

*__name__*: toNibbles

*__signature__*: toNibbles (input: Uint8Array): Uint8Array

*__summary__*: Converts the input to Nibbles.

*__description__*: From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.

*__example__*:   

```javascript
import { toNibbles } from '@polkadot/trie-codec/util';

toNibbles(new Uint8Array([0x41, 0x20]); // => Uint8Array([4, 1, 2, 0])
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` input |  `Uint8Array` &#124; `null`|

**Returns:** `Uint8Array`

___

