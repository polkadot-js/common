# CHANGELOG

## 3.5.0-beta.x

Contributed:

- Add Dock network identifiers (Thanks to https://github.com/lovesh)

Changes:

- Use cross-environment TextDecoder & TextEncoder from the polkadot-js polyfills
- Add `isBase{32, 58, 64}` to `@polkadot/util-crypto`
- Add `base64{Pad, Trim}` to add/remove padding characters
- Add `createFromJsonjson)` to keyring (create pair without adding)


## 3.4.1 Aug 31, 2020

Changes:

- Allow for WASM-as-available `mnemonicToBip39` call (used for Ethereum-compatible keypairs)
- Add `isWasm` utility to check for valid WASM headers
- `@polkadot/wasm-crypto` 1.4.1


## 3.3.1 Aug 24, 2020

Changes:

- Add `addressRaw` to Keyring interface (if address encoding is different to publicKey)
- Allow for Ethereum pair signing and verification


## 3.2.1 Aug 17, 2020

Changes:

- Allow for (optional, default blake2) hasher to secp256k1 sign/verify functions
- Utilities for secp256k1 publicKey expansion and compression
- Add basic Ethereum address utils (encode with checksum & checksum verification)
- Add Ethereum-compatible `mnemonicToBip39` seed creation function


## 3.1.1 Aug 10, 2020

Changes:

- Add `deriveAddress(<address>, '/<soft>/<soft-b>')` via sr25519 soft
- Use `scrypt` from WASM as available (JS fallback in place)
- Add `base32{Encode, Decode}` utilities (IPFS-compatible alphabet)
- Support IPFS compatibility flag in base58 encoding/decoding
- Update to `@polkadot/wasm-crypto` 1.3.1


## 3.0.1 Jul 27, 2020

Contributed:

- Add Katal ss58Format (Thanks to https://github.com/retotrinkler)

Changes:

- Adjust JSON pair output with scrypt kdf (version 3 output)


## 2.18.1 Jul 13, 2020

Changes:

- Add `base64{Decode, Encode, Validate}` as crypto utils
- Extract `base58Validate` from base58 decode checks
- Add `isAscii` to allow detection of printable ASCII sequences (including tab, newline)
- Add `isUtf8` to allow detection of valid Utf8 sequences


## 2.17.1 Jul 6, 2020

Changes:

- Add `encode{Derived, Multi}Address` to encode derived/multi addresses
- Correctly handle 0 inputs in `numberToU8a`
- Simplify and flatten base58 dependencies


## 2.16.1 Jun 29, 2020

Changes:

- Adjust `addressCheck` and `encodeAddress` function to check for valid base58 alphabets (better error reporting)
- Rename `createKeySub` to `createKeyDerived` based on changed in Substrate (sub keys now named derived)


## 2.15.1 Jun 22, 2020

Changes:

- Adjust keyring to no override 0-prefix (Polkadot live) settings with keychain default


## 2.14.1 Jun 16, 2020

Contributed:

- Add `extractTime` utility conversion (Thanks to https://github.com/kwingram25)


## 2.13.1 Jun 8, 2020

Changes:

- Fix JS blake2 fallback (non-wasm) to correctly deal with hex inputs
- Align `bnToHex` signature with `bnToU8a` (with old/new style)
- Allow `bnTo{Hex,U8a}` to take any value with `.toBn()` signatures


## 2.12.2 Jun 1, 2020

Changes:

- Fix `isFunction` signature to assert `Function`


## 2.12.1 Jun 1, 2020

- **Important** Removed `mnemonicToSeed`, it is only for bip39, use `mnemonicToMiniSecret` for the Substrate variant

Changes:

- Added `u8aEq` to compare two Uint8Array or hex values for an exact match
- Added `addressEq` to compare two addresses (ss58, Uint8array or hex) for an exact match
- Throw error on `{nacl,schnorrkel}Verify` on invalid input lengths
- Performance optimizations in `u8aToHex` & `u8aConcat`


## 2.11.1 May 26, 2020

Changes:

- Internal cleanups on typings
- Support for latest TypeScript, eslint & typescript-eslint


## 2.10.1 May 14, 2020

Contributed:

- Add Kulupu ss58 prefix as an allowed value (Thanks to https://github.com/sorpaas)

Changes:

- Make the `TextEncoder` polyfill handle non-compliant Buffer implementations (newer versions of Jest)
- `DeriveJunction` now also allows for BigInt values (aligning with number types elsewhere)
- Small code-flow optimizations


## 2.9.1 Apr 30, 2020

Contributed:

- Add support for ECDSA keypairs (Thanks to https://github.com/akru)

Changes:

- Added `createKeyMulti` & `createKeySub` to create utility sub & multi keys
- Added `u8aSorted` to sort `Uint8Arrays`
- Added `sortAddresses` to sort addresses based on their internal representation


## 2.8.1 Apr 9, 2020

- Keypair will now throw an error when attempting to sign/derive using a locked pair (Thanks to https://github.com/h4x3rotab)

Changes:

- Cleanup `isDevelopment` regex to cater for chains such as `Westend Development`


## 2.7.1 Mar 31, 2020

Changes:

- Add `bnSqrt` to calculate the integer sqrt via Newton iteration
- Allow for optional wasm-crypto, specifically via `@polkadot/util-crypto/noWasm`
- Misc. CI infrastructure cleanups


## 2.6.1 Feb 29, 2020

- **Breaking change** Following on the 2.0 release, `@polkadot/wasm` was updated to 1.1+. sr25510 now only verifies 0.8+ signatures, closing the loop on dropping Substrate 1.x-era support

Changes:

- Add `signatureVerify (message: Uint8Array | string, signature: Uint8Array | string, addressOrPublicKey: Uint8Array | string): VerifyResult` to verify any signature, regardless of type. Returns validity & detected crypto type.
- Add `cryptoIsReady (): boolean` function to check status of initialization
- Add `addressCheckChecksum (decoded: Uint8Array)` as an helper to extract and verify the ss58 checksum
- Swap to yarn 2, allow use in yarn 2 projects


## 2.5.1 Feb 22, 2020

- **Breaking change** (TypeScript only) The `*.d.ts` files now contain TypeScript 3.8 features, `#private`, which is not usable in older versions

Changes:

- Add `isBigInt(value)` to allow `BigInt` checks. Also add support in `bnToBn` as well as number conversion utils
- Add `isChildClass(Parent, Child?)` to check if a class extends the parent, asserting Child is Parent
- (internal) Use `#<field>` instead of `private _<field>` for private class variables


## 2.4.1 Feb 18, 2020

Changes:

- Ensure that `formatBalance` does not apply unit overrides apply when no SI is applicable
- Adjust `formatBalance(<balance>, <options>)` to take expanded `withUnit: string | boolean` option where string is an actual unit, e.g. `KSM`
- The `decimals` option to `formatBalance` should now be passed as part of the `options` (previous last-param deprecated)
- The `.setSS58Format` on keyring will now just operate on pairs created on the keyring, not globally. The global `setSS58Format` in `@polkadot/util-crypto` will be deprecated.
- The deprecated `addressPrefix` option to keyring has been belatedly removed (Use `ss58Format` rather)


## 2.3.1 Feb 15, 2020

Contributed:

- Remove dependency on moment.js with `formatDate` function (Thanks to https://github.com/AndreasGassmann)
- Move TypeScript `@types/*` to dev deps (Thanks to https://github.com/AndreasGassmann)

Changes:

- Update to `@polkadot/wasm-crypto` 1.0
- Cleanup dependencies to pave the way for using yarn 2 (Explicit instead of implicit)


## 2.2.1 Feb 06, 2020

Changes:

- Add resolver for jest requires (tests from src)


## 2.1.1 Feb 04, 2020

Changes:

- Update `detectPackage(<package.json>, __dirname?)` with calling folder


## 2.0.1 Jan 30, 2020

Changes:

- Update w3f/schnorrkel to 0.8.5 (Full Substrate 2.x support, no 1.x support)
- Remove Alice session (ed2551) account from testing keyring (not applicable to Substrate 2.x)
- Remove `chainspec`, `db`, `trie-codec`, `trie-db` and `trie-hash` packages (moved to client)
- Renamed `assertSingletonPackage` to `detectPackage` with inclusion of version listing
- Swap to elliptic library for secp2561 recovery (No node bindings)


## 1.8.1 Jan 09, 2020

Contributed:

- Add cross-client encryption/decryption support (Thanks to https://github.com/hskang9)


## 1.7.1 Nov 27, 2019

Changes:

- `formatBalance` signature now allows to force unit displays
- Keypair now allows for derive on a pair, with `pair.derive(...)`
- `assert` now acts like a real asserts, with no return - signature adapted for new TS 3.7


## 1.6.1 Oct 24, 2019

Changes:

- `pair.sign(message)` now takes an optional second `options?: SignOptions` parameter, where `SignOptions` is currently defined as `{ withType: boolean }`. Here `withType` instructs the signing to prepend the type of signature (ed2551, sr25519 or ecdsa). This is used for the new Polkadot/Substrate MultiSignature format.


## 1.5.1 Sep 25, 2019

Changes:

- Fix typings on the Keyring-exposed encode & decodeAddress
- Allow ss58Format = 0 as a valid value
- Loosen type definitions for allowed ss58format values (still checked against allowed array)


## 1.4.1 Sep 12, 2019

- **Breaking change** To set the `ss58Format`, you should now use `setSS58Format` as opposed to the old `setAddressPrefix`

Changes:

- Renamed `keyring.setAddressPrefix` to `keyring.setSS58Format`
- Deprecated `addressPrefix` on the keyring options, added the `ss58Format` as a replacement (aligning with chain properties - the old version is still accepted)
- Added `stringToHex` and `hexToString` conversion utilities to `@polkadot/util`
- Swap to [Babel 7.6.0](https://babeljs.io/) for all compilation, for latest improvements in code generation


## 1.3.1 Sep 10, 2019

Changes:

- Remove the `ExtError` class, always prefer the standard JS `Error` object for errors. This would bre a breaking change for any applications using `ExtError`


## 1.2.1 Sep 09, 2019

Changes:

- Keyring `addFromAddress` can now be used to store external accounts, for example those provided by external signers
- Maintainability updates


## 1.1.1 Aug 09, 2019

Changes:

- `assertSingletonPackage` now warns via console.warn, but does not throw. This does allow the info to come accross while still allowing the app developers using multiple libraries time to fix.


## 1.0.1 Aug 02, 2019

Changes:

- `formatBalance` now allows for `Compact` inputs
- `formaBalance` now allows correct formatting of very large decimals


## 0.94.1 Jul 20, 2019
Changes:

- Add `checkAddress(address, prefix)` to `@polkadot/util-crypto` that validates an ss-58 address
- Add support for the Kusama network (as a valid checked prefix)
- Add an `asm.js` fallback for the React Native environment (via `@polkadot/wasm-crypto`)
- The ed25519 key for Alice (representing the session), now appears in the test keyrings
- Fix missing dependencies for keyring (after address moves in 0.93.1)


## 0.93.1 Jun 14, 2019

Changes:

- Breaking: External pair interface for keyring has been changed. Instead of
  - `getMeta` use the `meta` getter, i.e. `console.log(pair.meta.name)`
  - `address` use the `address` getter, i.e. `console.log(pair.address)`
  - `publicKey` use the `publicKey` getter, i.e. `console.log(pair.publicKey)`
- `Move decodeAddress`, `encodeAddress` & `setAddressPrefix` functions into `@polkadot/util-crypto` from `@polkadot/keyring`. External interfaces should not be affected at this point since it is also (still) exported and exposed on keyring


## 0.92.1 Jun 04, 2019

Changes:

- Only allow integer input values into `formatBalance`
- Allow `formatBalance`, `formatDecimal` & `formatNumber` to cater for negative numbers
- Add 'Bob//stash' to testing keyring, joining the existing 'Alice//stash'


## 0.91.1 May 22, 2019

Changes:

- ed25519/sr25519 sign & verify functions can now take the message input as Uint8Array/string/hex and verify allows for the signature/publicKey to be specified as Uint8Array/hex
- Update `@polkadot/wasm` to include a maintenance bump for the `w3f/schnorrkel` libraries


## 0.90.1 May 08, 2019

Changes:

- Moving towards 1.0
- Added bnMin & bnMax functions


## 0.76.1 Apr 03, 2019

Changes:

- Fix `addFromMnemonic` to generate using new-style derivation.
- Pull in `formatBalance`, `formatDecimal`, `formatElapsed`, `formatNumber`, `calcSi`, `findSi` & `isTestChain` utility functions from the originals in `@polkadot/ui-util`
- Swap out `wasm-schnorrkel` & `wasm-ed25519` for combined version with `wasm-crypto`
- Swap DB interfaces to optional LRU, removing `transactionAsync` (client-only changes)


## 0.75.1 Mar 29, 2019

Changes:

- Start journey to 1.0


## 0.42.1 Mar 28, 2019

Changes:

- Add `assertSingletonPackage` to util
- Ensure that only a single keyring instance is loaded (uses above)


## 0.41.1 Mar 25, 2019

Changes:

- Extensions to the client-specific database interfaces (non-breaking for API and util users)


## 0.40.1 Mar 23, 2019

Changes:

- Add additional derivation path extraction mechanisms to util-crypto
- Add createFromUri function to keypair (creates keypair, does not add it)
- Allow all crypto hashing & ed25519 to use WASM (as available, JS fallbacks)


## 0.39.1 Mar 20, 2019

Changes:

- Pull in bip39 generation functions from `@poladkot/wasm-crypto` with a fallback to the pure JS versions


## 0.38.1 Mar 18, 2019

Changes:

- Align with current substrate master for sr25519 keys and hard/soft derivation
- Swap default dev keys to derived (sr25519)


## 0.37.1 Mar 14, 2019

Changes:

- Swap to publishing -beta.x on merge (non-breaking testing)


## 0.36.1 Mar 13, 2019

Changes:

- Add `fromUri` to keyring along with hard & soft key derivation.


## 0.35.1 Mar 04, 2019

Changes:

- Remove NodeJs-only `syncify` function, not exported by the package (with binary dependency for Node)


## 0.34.1 Feb 13, 2019

Changes:

- Keyring now allows for ed25519 and sr25519 instances. Upon creation, you need to pass the `ed25519`or `sr25519` string to denote the type, i.e. `new Keyring({ type: 'sr25519' })`


## 0.33.1 Nov 22, 2018

## 0.32.1 Oct 18, 2018

## 0.31.1 Oct 12, 2018

## 0.30.1 Sep 11, 2018

## 0.29.1 Sep 01, 2018

## 0.28.1 Aug 11, 2018

## 0.27.1 Aug 06, 2018

## 0.26.1 Jun 27, 2018

## 0.25.1 Jun 26, 2018

## 0.24.1 Jun 22, 2018

## 0.23.1 Jun 21, 2018

## 0.22.1 May 24, 2018

## 0.21.1 May 17, 2018

## 0.20.1 May 16, 2018

## 0.19.1 Apr 19, 2018

## 0.18.1 Mar 20, 2018

## 0.17.1 Mar0 8, 2018

## 0.16.1 Feb 23, 2018

## 0.15.1 Feb 15, 2018

## 0.14.1 Feb 07, 2018

## 0.13.1 Jan 25, 2018

## 0.12.1 Jan 11, 2018

## 0.11.1 Dec 30, 2017

## 0.10.1 Dec 17, 2017

## 0.9.1 Dec 14, 2017

## 0.8.1 Dec 12, 2017

## 0.7.1 Dec 11, 2017

## 0.6.1 Nov 30, 2017

## 0.5.1 Nov 20, 2017

## 0.4.1 Nov 19, 2017

## 0.3.1 Nov 19, 2017

## 0.2.1 Nov 18, 2017
