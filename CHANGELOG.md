# 2.3.0-beta.x

- Move TypeScript `@types/*` to dev deps (Thanks to https://github.com/AndreasGassmann)
- Move to `@polkadot/wasm-crypto` 1.0
- Cleanup dependencies to pave the way for using yarn2 (Explicit instead of implicit)

# 2.2.1 Feb 06, 2020

- Add resolver for jest requires (tests from src)

# 2.1.1 Feb 04, 2020

- Update `detectPackage(<package.json>, __dirname?)` with calling folder

# 2.0.1 Jan 30, 2020

- Update w3f/schnorrkel to 0.8.5 (Full Substrate 2.x support, no 1.x support)
- Remove Alice session (ed2551) account from testing keyring (not applicable to Substrate 2.x)
- Remove `chainspec`, `db`, `trie-codec`, `trie-db` and `trie-hash` packages (moved to client)
- Renamed `assertSingletonPackage` to `detectPackage` with inclusion of version listing
- Swap to elliptic library for secp2561 recovery (No node bindings)

# 1.8.1 Jan 09, 2020

- Add cross-client encryption/decryption support (Thanks to https://github.com/hskang9)

# 1.7.1 Nov 27, 2019

- `formatBalance` signature now allows to force unit displays
- Keypair now allows for derive on a pair, with `pair.derive(...)`
- `assert` now acts like a real asserts, with no return - signature adapted for new TS 3.7

# 1.6.1 Oct 24, 2019

- `pair.sign(message)` now takes an optional second `options?: SignOptions` parameter, where `SignOptions` is currently defined as `{ withType: boolean }`. Here `withType` instructs the signing to prepend the type of signature (ed2551, sr25519 or ecdsa). This is used for the new Polkadot/Substrate MultiSignature format.

# 1.5.1 Sep 25, 2019

- Fix typings on the Keyring-exposed encode & decodeAddress
- Allow ss58Format = 0 as a valid value
- Loosen type definitions for allowed ss58format values (still checked against allowed array)

# 1.4.1 Sep 12, 2019

- **Breaking change** To set the `ss58Format`, you should now use `setSS58Format` as opposed to the old `setAddressPrefix`
- Renamed `keyring.setAddressPrefix` to `keyring.setSS58Format`
- Deprecated `addressPrefix` on the keyring options, added the `ss58Format` as a replacement (aligning with chain properties - the old version is still accepted)
- Added `stringToHex` and `hexToString` conversion utilities to `@polkadot/util`
- Swap to [Babel 7.6.0](https://babeljs.io/) for all compilation, for latest improvements in code generation

# 1.3.1 Sep 10, 2019

- Remove the `ExtError` class, always prefer the standard JS `Error` object for errors. This would bre a breaking change for any applications using `ExtError`

# 1.2.1 Sep 09, 2019

- Keyring `addFromAddress` can now be used to store external accounts, for example those provided by external signers
- Maintainability updates

# 1.1.1 Aug 09, 2019

- `assertSingletonPackage` now warns via console.warn, but does not throw. This does allow the info to come accross while still allowing the app developers using multiple libraries time to fix.

# 1.0.1 Aug 02, 2019

- `formatBalance` now allows for `Compact` inputs
- `formaBalance` now allows correct formatting of very large decimals

# 0.94.1 Jul 20, 2019

- Add `checkAddress(address, prefix)` to `@polkadot/util-crypto` that validates an ss-58 address
- Add support for the Kusama network (as a valid checked prefix)
- Add an `asm.js` fallback for the React Native environment (via `@polkadot/wasm-crypto`)
- The ed25519 key for Alice (representing the session), now appears in the test keyrings
- Fix missing dependencies for keyring (after address moves in 0.93.1)

# 0.93.1 Jun 14, 2019

- Breaking: External pair interface for keyring has been changed. Instead of
  - `getMeta` use the `meta` getter, i.e. `console.log(pair.meta.name)`
  - `address` use the `address` getter, i.e. `console.log(pair.address)`
  - `publicKey` use the `publicKey` getter, i.e. `console.log(pair.publicKey)`
- `Move decodeAddress`, `encodeAddress` & `setAddressPrefix` functions into `@polkadot/util-crypto` from `@polkadot/keyring`. External interfaces should not be affected at this point since it is also (still) exported and exposed on keyring

# 0.92.1 Jun 04, 2019

- Only allow integer input values into `formatBalance`
- Allow `formatBalance`, `formatDecimal` & `formatNumber` to cater for negative numbers
- Add 'Bob//stash' to testing keyring, joining the existing 'Alice//stash'

# 0.91.1 May 22, 2019

- ed25519/sr25519 sign & verify functions can now take the message input as Uint8Array/string/hex and verify allows for the signature/publicKey to be specified as Uint8Array/hex
- Update `@polkadot/wasm` to include a maintenance bump for the `w3f/schnorrkel` libraries

# 0.90.1 May 08, 2019

- Moving towards 1.0
- Added bnMin & bnMax functions

# 0.76.1 Apr 03, 2019

- Fix `addFromMnemonic` to generate using new-style derivation.
- Pull in `formatBalance`, `formatDecimal`, `formatElapsed`, `formatNumber`, `calcSi`, `findSi` & `isTestChain` utility functions from the originals in `@polkadot/ui-util`
- Swap out `wasm-schnorrkel` & `wasm-ed25519` for combined version with `wasm-crypto`
- Swap DB interfaces to optional LRU, removing `transactionAsync` (client-only changes)

# 0.75.1 Mar 29, 2019

- Start journey to 1.0

# 0.42.1 Mar 28, 2019

- Add `assertSingletonPackage` to util
- Ensure that only a single keyring instance is loaded (uses above)

# 0.41.1 Mar 25, 2019

- Extensions to the client-specific database interfaces (non-breaking for API and util users)

# 0.40.1 Mar 23, 2019

- Add additional derivation path extraction mechanisms to util-crypto
- Add createFromUri function to keypair (creates keypair, does not add it)
- Allow all crypto hashing & ed25519 to use WASM (as available, JS fallbacks)

# 0.39.1 Mar 20, 2019

- Pull in bip39 generation functions from `@poladkot/wasm-crypto` with a fallback to the pure JS versions

# 0.38.1 Mar 18, 2019

- Align with current substrate master for sr25519 keys and hard/soft derivation
- Swap default dev keys to derived (sr25519)

# 0.37.1 Mar 14, 2019

- Swap to publishing -beta.x on merge (non-breaking testing)

# 0.36.1 Mar 13, 2019

- Add `fromUri` to keyring along with hard & soft key derivation.

# 0.35.1 Mar 04, 2019

- Remove NodeJs-only `syncify` function, not exported by the package (with binary dependency for Node)

# 0.34.1 Feb 13, 2019

- Keyring now allows for ed25519 and sr25519 instances. Upon creation, you need to pass the `ed25519`or `sr25519` string to denote the type, i.e. `new Keyring({ type: 'sr25519' })`

# 0.33.1 Nov 22, 2018

# 0.32.1 Oct 18, 2018

# 0.31.1 Oct 12, 2018

# 0.30.1 Sep 11, 2018

# 0.29.1 Sep 01, 2018

# 0.28.1 Aug 11, 2018

# 0.27.1 Aug 06, 2018

# 0.26.1 Jun 27, 2018

# 0.25.1 Jun 26, 2018

# 0.24.1 Jun 22, 2018

# 0.23.1 Jun 21, 2018

# 0.22.1 May 24, 2018

# 0.21.1 May 17, 2018

# 0.20.1 May 16, 2018

# 0.19.1 Apr 19, 2018

# 0.18.1 Mar 20, 2018

# 0.17.1 Mar0 8, 2018

# 0.16.1 Feb 23, 2018

# 0.15.1 Feb 15, 2018

# 0.14.1 Feb 07, 2018

# 0.13.1 Jan 25, 2018

# 0.12.1 Jan 11, 2018

# 0.11.1 Dec 30, 2017

# 0.10.1 Dec 17, 2017

# 0.9.1 Dec 14, 2017

# 0.8.1 Dec 12, 2017

# 0.7.1 Dec 11, 2017

# 0.6.1 Nov 30, 2017

# 0.5.1 Nov 20, 2017

# 0.4.1 Nov 19, 2017

# 0.3.1 Nov 19, 2017

# 0.2.1 Nov 18, 2017
