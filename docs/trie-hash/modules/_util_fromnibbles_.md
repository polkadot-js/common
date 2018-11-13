

# Functions

<a id="fromnibbles"></a>

##  fromNibbles

▸ **fromNibbles**(nibbles: * `Uint8Array` &#124; `Array`<`number`>*): `Uint8Array`

*Defined in [util/fromNibbles.ts:20](https://github.com/polkadot-js/common/blob/8f6b01a/packages/trie-hash/src/util/fromNibbles.ts#L20)*

*__name__*: fromNibbles

*__signature__*: fromNibbles (nibbles: Uint8Array): Uint8Array

*__summary__*: Converts the input to Nibbles.

*__description__*: From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.

*__example__*:   

```javascript
import { fromNibbles } from '@polkadot/trie-hash/util';

asNibbles(new Uint8Array([4, 1, 2, 0])); // => Uint8Array([0x41, 0x20]
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| nibbles |  `Uint8Array` &#124; `Array`<`number`>|

**Returns:** `Uint8Array`

___

