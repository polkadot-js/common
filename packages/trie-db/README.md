# @polkadot/trie-db

A re-implementation of a Patricia Trie. Unlike other implementations, this allows for the specification of a hash function as well as encoder/decoder and operates in a sync fashion by default.

This is a JavaScript port of the (Python Ethereum Trie)[https://github.com/ethereum/py-trie] with additions to support transactions (checkpoints) and multiple hashing (npot only Keccak, but also Blake2 as found in Polkadot).
