# @polkadot/util-rlp

Utility methods for encoding and decoding [Ethereum RLP structures](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP). This is port adapted from the original [EthereumJS RLP](https://github.com/ethereumjs/rlp/blob/0ce09db81fc303fcee593f7cc094ba44015f9b92/index.js) implementation to cater for `Uint8Array` outputs (instead of `Buffer`) in addition to typings.

## Usage

Installation -

```
yarn add @polkadot/util-rlp
```

Functions can be imported as follows:

```js
import { decode } from '@polkadot/util-rlp';
import { encode } from '@polkadot/util-rlp';
```

## Documentation and Available Utilities

No methods are exposed in the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/util-rlp/) because RLP will not be included in PoC-3 of Polkadot.

However, the key functions that are available include:

- util-rlp
  - Functions
    - Decoder
      - decode
      - decodeListLong
      - decodeListShort
      - decodeNumber
      - decodeSingle
      - decodeString
      - safeParseInt
    - Encoder
      - encode
      - encodeArray
      - encodeLength
      - encodeU8a
      - toU8a