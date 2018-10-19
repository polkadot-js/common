# @polkadot/trie-hash

Calculate ordered and unordered [Ethereum Trie hashes](https://github.com/ethereum/wiki/wiki/Patricia-Tree) from inputs.

## Usage

Installation -

```
yarn add @polkadot/trie-hash
```

Functions can be imported as follows:

```js
import { trieRoot } from '@polkadot/trie-hash';
```

## Documentation and Available Utilities

Below is a list of currently exposed methods published at the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/trie-hash/).

- [trie-hash](https://polkadot.js.org/common/trie-hash/README.md)
  - Functions
    - Encode
      - [encode](https://polkadot.js.org/common/trie-hash/modules/_encode_index_.md)
      - [encodeAux](https://polkadot.js.org/common/trie-hash/modules/_encode_aux_.md)
      - [encodeHexPrefix](https://polkadot.js.org/common/trie-hash/modules/_encode_hexprefix_.md)
      - [encodePairs](https://polkadot.js.org/common/trie-hash/modules/_encode_pairs_.md)
      - [encodeShared](https://polkadot.js.org/common/trie-hash/modules/_encode_shared_.md)
      - [encodeSingle](https://polkadot.js.org/common/trie-hash/modules/_encode_single_.md)
    - Trie Root
      - [trieRoot](https://polkadot.js.org/common/trie-hash/modules/_root_.md)
      - [trieRootOrdered](https://polkadot.js.org/common/trie-hash/modules/_rootordered_.md)
    - Util
      - [asNibbles](https://polkadot.js.org/common/trie-hash/modules/_util_asnibbles_.md)
      - [fromNibbles](https://polkadot.js.org/common/trie-hash/modules/_util_fromnibbles_.md)
      - [genRoot](https://polkadot.js.org/common/trie-hash/modules/_util_genroot_.md)
      - [getSharedLength](https://polkadot.js.org/common/trie-hash/modules/_util_sharedlength_.md)
      - [pairsUniq](https://polkadot.js.org/common/trie-hash/modules/_util_pairsuniq_.md)
      - [sharedPrefixLength](https://polkadot.js.org/common/trie-hash/modules/_util_sharedprefixlength_.md)
