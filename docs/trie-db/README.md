
[![polkadotjs](https://img.shields.io/badge/polkadot-js-orange.svg?style=flat-square)](https://polkadot.js.org) ![isc](https://img.shields.io/badge/license-ISC-lightgrey.svg?style=flat-square) [![style](https://img.shields.io/badge/code%20style-semistandard-lightgrey.svg?style=flat-square)](https://github.com/Flet/semistandard) [![npm](https://img.shields.io/npm/v/@polkadot/util.svg?style=flat-square)](https://www.npmjs.com/package/@polkadot/util) [![travis](https://img.shields.io/travis/polkadot-js/common.svg?style=flat-square)](https://travis-ci.org/polkadot-js/common) [![maintainability](https://img.shields.io/codeclimate/maintainability/polkadot-js/common.svg?style=flat-square)](https://codeclimate.com/github/polkadot-js/common/maintainability) [![coverage](https://img.shields.io/coveralls/polkadot-js/common.svg?style=flat-square)](https://coveralls.io/github/polkadot-js/common?branch=master) [![dependency](https://david-dm.org/polkadot-js/common.svg?style=flat-square&path=packages/util)](https://david-dm.org/polkadot-js/common?path=packages/util) [![devDependency](https://david-dm.org/polkadot-js/common/dev-status.svg?style=flat-square&path=packages/util)](https://david-dm.org/polkadot-js/common?path=packages/util#info=devDependencies)

@polkadot/util
==============

Various useful utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

Usage
-----

Installation -

```
npm install --save @polkadot/util
```

Functions can be imported directly from the package, e.g.

```js
import { isHex } from '@polkadot/util';
```

Alternatively the function can be accessed directly,

```js
import isHex from '@polkadot/util/is/hex';
```

Available Utilities
-------------------

For a list of currently exposed methods, see the [library documentation](docs/README.md).

## Index

### External modules

* ["trie-db/src/BaseTrie"](modules/_trie_db_src_basetrie_.md)
* ["trie-db/src/CheckpointTrie"](modules/_trie_db_src_checkpointtrie_.md)
* ["trie-db/src/Node"](modules/_trie_db_src_node_.md)
* ["trie-db/src/constants"](modules/_trie_db_src_constants_.md)
* ["trie-db/src/encoder/decode"](modules/_trie_db_src_encoder_decode_.md)
* ["trie-db/src/encoder/encode"](modules/_trie_db_src_encoder_encode_.md)
* ["trie-db/src/encoder/index"](modules/_trie_db_src_encoder_index_.md)
* ["trie-db/src/index"](modules/_trie_db_src_index_.md)
* ["trie-db/src/nibbles/fromU8a"](modules/_trie_db_src_nibbles_fromu8a_.md)
* ["trie-db/src/nibbles/index"](modules/_trie_db_src_nibbles_index_.md)
* ["trie-db/src/nibbles/isEqual"](modules/_trie_db_src_nibbles_isequal_.md)
* ["trie-db/src/nibbles/matchingLength"](modules/_trie_db_src_nibbles_matchinglength_.md)
* ["trie-db/src/nibbles/toU8a"](modules/_trie_db_src_nibbles_tou8a_.md)
* ["trie-db/src/nodeFactory"](modules/_trie_db_src_nodefactory_.md)
* ["trie-db/src/proof/index"](modules/_trie_db_src_proof_index_.md)
* ["trie-db/src/proof/prove"](modules/_trie_db_src_proof_prove_.md)
* ["trie-db/src/proof/verifyProof"](modules/_trie_db_src_proof_verifyproof_.md)
* ["trie-db/src/streams/ScratchRead"](modules/_trie_db_src_streams_scratchread_.md)
* ["trie-db/src/streams/TrieRead"](modules/_trie_db_src_streams_trieread_.md)
* ["trie-db/src/util/isRawNode"](modules/_trie_db_src_util_israwnode_.md)
* ["trie-db/src/util/rlpToString"](modules/_trie_db_src_util_rlptostring_.md)
* ["trie-db/src/util/semaphore"](modules/_trie_db_src_util_semaphore_.md)
* ["trie-db/src/util/taskExecutor"](modules/_trie_db_src_util_taskexecutor_.md)
* ["trie-hash/src/encode/aux"](modules/_trie_hash_src_encode_aux_.md)
* ["trie-hash/src/encode/hexPrefix"](modules/_trie_hash_src_encode_hexprefix_.md)
* ["trie-hash/src/encode/index"](modules/_trie_hash_src_encode_index_.md)
* ["trie-hash/src/encode/pairs"](modules/_trie_hash_src_encode_pairs_.md)
* ["trie-hash/src/encode/shared"](modules/_trie_hash_src_encode_shared_.md)
* ["trie-hash/src/encode/single"](modules/_trie_hash_src_encode_single_.md)
* ["trie-hash/src/root"](modules/_trie_hash_src_root_.md)
* ["trie-hash/src/util/asNibbles"](modules/_trie_hash_src_util_asnibbles_.md)
* ["trie-hash/src/util/genRoot"](modules/_trie_hash_src_util_genroot_.md)
* ["trie-hash/src/util/pairsUniq"](modules/_trie_hash_src_util_pairsuniq_.md)
* ["trie-hash/src/util/sharedLength"](modules/_trie_hash_src_util_sharedlength_.md)
* ["trie-hash/src/util/sharedPrefixLength"](modules/_trie_hash_src_util_sharedprefixlength_.md)
* ["util-crypto/src/keccak/asU8a"](modules/_util_crypto_src_keccak_asu8a_.md)
* ["util-rlp/src/decode"](modules/_util_rlp_src_decode_.md)
* ["util-rlp/src/decoder/decode"](modules/_util_rlp_src_decoder_decode_.md)
* ["util-rlp/src/decoder/index"](modules/_util_rlp_src_decoder_index_.md)
* ["util-rlp/src/decoder/listLong"](modules/_util_rlp_src_decoder_listlong_.md)
* ["util-rlp/src/decoder/listShort"](modules/_util_rlp_src_decoder_listshort_.md)
* ["util-rlp/src/decoder/number"](modules/_util_rlp_src_decoder_number_.md)
* ["util-rlp/src/decoder/safeParseInt"](modules/_util_rlp_src_decoder_safeparseint_.md)
* ["util-rlp/src/decoder/single"](modules/_util_rlp_src_decoder_single_.md)
* ["util-rlp/src/decoder/string"](modules/_util_rlp_src_decoder_string_.md)
* ["util-rlp/src/encode"](modules/_util_rlp_src_encode_.md)
* ["util-rlp/src/encoder/array"](modules/_util_rlp_src_encoder_array_.md)
* ["util-rlp/src/encoder/index"](modules/_util_rlp_src_encoder_index_.md)
* ["util-rlp/src/encoder/length"](modules/_util_rlp_src_encoder_length_.md)
* ["util-rlp/src/encoder/toU8a"](modules/_util_rlp_src_encoder_tou8a_.md)
* ["util-rlp/src/encoder/u8a"](modules/_util_rlp_src_encoder_u8a_.md)
* ["util/src/assert"](modules/_util_src_assert_.md)
* ["util/src/bn/toBn"](modules/_util_src_bn_tobn_.md)
* ["util/src/bn/toHex"](modules/_util_src_bn_tohex_.md)
* ["util/src/bn/toU8a"](modules/_util_src_bn_tou8a_.md)
* ["util/src/buffer/toU8a"](modules/_util_src_buffer_tou8a_.md)
* ["util/src/ext/error"](modules/_util_src_ext_error_.md)
* ["util/src/hex/addPrefix"](modules/_util_src_hex_addprefix_.md)
* ["util/src/hex/fixLength"](modules/_util_src_hex_fixlength_.md)
* ["util/src/hex/hasPrefix"](modules/_util_src_hex_hasprefix_.md)
* ["util/src/hex/stripPrefix"](modules/_util_src_hex_stripprefix_.md)
* ["util/src/hex/toU8a"](modules/_util_src_hex_tou8a_.md)
* ["util/src/is/bn"](modules/_util_src_is_bn_.md)
* ["util/src/is/buffer"](modules/_util_src_is_buffer_.md)
* ["util/src/is/function"](modules/_util_src_is_function_.md)
* ["util/src/is/hex"](modules/_util_src_is_hex_.md)
* ["util/src/is/instanceOf"](modules/_util_src_is_instanceof_.md)
* ["util/src/is/null"](modules/_util_src_is_null_.md)
* ["util/src/is/number"](modules/_util_src_is_number_.md)
* ["util/src/is/string"](modules/_util_src_is_string_.md)
* ["util/src/is/u8a"](modules/_util_src_is_u8a_.md)
* ["util/src/is/undefined"](modules/_util_src_is_undefined_.md)
* ["util/src/logger"](modules/_util_src_logger_.md)
* ["util/src/number/toHex"](modules/_util_src_number_tohex_.md)
* ["util/src/number/toU8a"](modules/_util_src_number_tou8a_.md)
* ["util/src/promisify"](modules/_util_src_promisify_.md)
* ["util/src/u8a/concat"](modules/_util_src_u8a_concat_.md)
* ["util/src/u8a/fromUtf8"](modules/_util_src_u8a_fromutf8_.md)
* ["util/src/u8a/polyfill/textEncoder"](modules/_util_src_u8a_polyfill_textencoder_.md)
* ["util/src/u8a/toBuffer"](modules/_util_src_u8a_tobuffer_.md)
* ["util/src/u8a/toHex"](modules/_util_src_u8a_tohex_.md)
* ["util/src/u8a/toU8a"](modules/_util_src_u8a_tou8a_.md)

---

