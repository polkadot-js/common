# @polkadot/trie-db

A re-implementation of a Patricia Trie. Unlike other implementations, this allows for the specification of a hash function as well as encoder/decoder and operates in a sync fashion by default.

This is a JavaScript port of the [Python Ethereum Trie](https://github.com/ethereum/py-trie) with additions to support transactions (checkpoints) and multiple hashing (npot only Keccak, but also Blake2 as found in Polkadot).

## Usage

Installation -

```
yarn add @polkadot/trie-db
```

Classes can be imported as follows:

```js
import Trie from '@polkadot/trie-db'; // Default export
```

## Documentation and Available Utilities

Below is a list of currently exposed methods published at the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/trie-db/).

- [trie-db](https://polkadot.js.org/common/trie-db/README.md)
  - Classes
    - [Trie](https://polkadot.js.org/common/trie-db/classes/_index_.trie.md)
  - Functions
    - Util
      - [is](https://polkadot.js.org/common/trie-db/modules/_util_is_.md)
      - [key](https://polkadot.js.org/common/trie-db/modules/_util_key_.md)
      - [nibbles](https://polkadot.js.org/common/trie-db/modules/_util_nibbles_.md)
      - [node](https://polkadot.js.org/common/trie-db/modules/_util_node_.md)