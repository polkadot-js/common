# Available interfaces

Utility methods to create [Ethereum Trie hashes](https://github.com/ethereum/wiki/wiki/Patricia-Tree)


# Available methods

## trieRoot

Creates a trie hash from the supplied pairs.

```js
trieRoot (pairs: Trie$Pairs): Uint8Array
```


From an `Array<{k: Uint8Array, v: Uint8Array}>` input, calculate the triehash and return the result as a `Uint8Array`.

```js
import { stringToU8a } from '@polkadot/util';
import { trieRoot } from '@polkadot/trie-hash';

trieRoot([{
k: stringToU8a('A'),
v: stringToU8a('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
}]) // => 0xd23786fb4a010da3ce639d66d5e904a11dbc02746d1ce25029e53290cabf28ab
```

## trieRootOrdered

Creates a trie hash from the supplied values.

```js
trieRootOrdered (values: Array<Uint8Array>): Uint8Array
```


From an `Array<Uint8Array>` input, calculate the ordered triehash and return the result as a `Uint8Array`.

```js
import { stringToU8a } from '@polkadot/util';
import { trieRootOrdered } from '@polkadot/trie-hash';

trieRootOrdered([
stringToU8a('doe'),
stringToU8a('reindeer')
]) // => 0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3
```
