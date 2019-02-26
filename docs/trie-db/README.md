
@polkadot/trie-db
=================

A re-implementation of a Patricia Trie. Unlike other implementations, this allows for the specification of a hash function as well as encoder/decoder and operates in a sync fashion by default.

This is a JavaScript port of the [Python Ethereum Trie](https://github.com/ethereum/py-trie) with additions to support transactions (checkpoints) and multiple codecs, by default only the Substrate codec.

Usage
-----

Installation -

```
yarn add @polkadot/trie-db
```

Classes can be imported as follows:

```js
import Trie from '@polkadot/trie-db'; // Default export
```

Utilities
---------

[Utilities](SUMMARY.md)

