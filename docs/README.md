# Polkadot Javascript Common

Various useful utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

It is split up into a number of internal packages, namely utilities -

- [keyring](keyring/README.md) Keyring management
- [util](util/README.md) General utilities
- [util-crypto](util-crypto/README.md) Crypto and hashing utilities
- [util-rlp](util-rlp/README.md) RLP encoding & decoding

Various useful trie and database interfaces -

- [db](db/README.md) Sync memory and disk database interfaces
- [trie-db](trie-db/README.md) Merkle Patricia Tree implementation adapcted for Polkadot
- [trie-hash](trie-hash/README.md) Calculate hashes (either ordered or unordered) from a set of inputs

This guide describes Polkadot Javascript Common.

{% include "SUMMARY.md" %}

## The Polkadot Project

You can read more about the Polkadot Network at https://polkadot.network/

## Github repositories

You can find the Polkadot repositories at:

- https://github.com/polkadot-js
- https://github.com/paritytech/polkadot
- https://github.com/paritytech/substrate

This documentation is generated from https://github.com/polkadot-js/api

## Contributing

Contribution to Polkadot JS Common are more than welcome. You can [report issues](https://github.com/polkadot-js/common/issues/new) and [log feature requests](https://github.com/polkadot-js/common/issues/new).
