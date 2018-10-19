

# Functions

<a id="asnibbles"></a>

##  asNibbles

▸ **asNibbles**(bytes: * `Uint8Array` &#124; `Array`<`number`> &#124; `null`*): `Uint8Array`

*Defined in [util/asNibbles.ts:20](https://github.com/polkadot-js/common/blob/1fb1f9d/packages/trie-hash/src/util/asNibbles.ts#L20)*

*__name__*: asNibbles

*__signature__*: asNibbles (bytes: Uint8Array | Array): Uint8Array

*__summary__*: Converts the input to Nibbles.

*__description__*: From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.

*__example__*:   
```javascript
import { asNibbles } from '@polkadot/trie-hash/util';

asNibbles(new Uint8Array([0x41, 0x20]); // => Uint8Array([4, 1, 2, 0])
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| bytes |  `Uint8Array` &#124; `Array`<`number`> &#124; `null`|

**Returns:** `Uint8Array`

___

