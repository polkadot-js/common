# @polkadot/trie-db-ext

A re-implementation of a Patricia Trie, porting the [Parity version](https://github.com/paritytech/parity-common/blob/master/patricia_trie/src/triedbmut.rs) from Rust to JavaScript.

Unlike other implementations, this allows for the specification of a hash function as well as encoder/decoder.
