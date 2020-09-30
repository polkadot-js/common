# @polkadot/util-crypto

Various useful cyrpto utility functions that are used across all projects in the [@polkadot](https://polkadot.js.org) namespace. It provides utility functions with additional safety checks, allowing not only for consistent coding, but also reducing the general boilerplate.

## Usage

Installation -

```
yarn add @polkadot/util-crypto
```

Functions can be imported as follows:

```js
import { mnemonicGenerate } from '@polkadot/util-crypto';
```

## Example

```js
import { mnemonicGenerate, mnemonicToBip39, naclKeypairFromSeed, encodeAddress } from '@polkadot/util-crypto';

const mnemonic = mnemonicGenerate()
console.log('mnemonic:', mnemonic)

const seed = Buffer.from(mnemonicToBip39(mnemonic))
console.log('seed', seed.toString('hex'))

const keyPair = naclKeypairFromSeed(seed) // using ed25519
console.log('keyPair', keyPair)

const address = encodeAddress(keyPair.publicKey)
console.log('address', address)
```
