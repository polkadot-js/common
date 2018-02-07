# util

Internal utilities used along with hash generation 

- [asNibbles](#asnibbles) Converts the input to Nibbles.

## asNibbles

Converts the input to Nibbles. 

```js
asNibbles (pairs: Trie$Pairs): Uint8Array
```


From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.

```js
import { asNibbles } from '@polkadot/util-triehash/util';

asNibbles(new Uint8Array([0x41, 0x20]) // => Uint8Array([4, 1, 2, 0])
```