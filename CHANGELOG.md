# CHANGELOG

## 7.4.1 Sep 17, 2021

Changes:

- Add `u8aWrapBytes` & `u8aUnwrapBytes` (originally from `@polkadot/extension-dapp`)
- Verify both wrapped and unwrapped signatures transparently
- Adjust `isHex` return to `0x${string}` under TypeScript
- Adjust shared repo Jest config
- Sync with upstream Substrate ss58 registry


## 7.3.1 Aug 28, 2021

Contributed:

- Added Bifrost genesisHash (Thanks to https://github.com/awesomepan)
- Added Stafi genesisHash (Thanks to https://github.com/Tore19)
- Add Ledger support for Nodle (Thanks to https://github.com/ETeissonniere)

Changes:

- Add support for `schnorrkelAgreement` (as exposed by new `wasm-crypto`)
- Ensure `schnorrkel*` functions allows hex inputs
- `@polkadot/wasm-crypto` 4.2.1
- Sync with upstream Substrate ss58 registry


## 7.2.1 Aug 15, 2021

Contributed:

- Always use `bigint` type to indicate instance (Thanks to https://github.com/ntduan)

Changes:

- Added `u8aEmpty` helper check, all 0 or no length
- Cleanup additional circular dependencies detected by rollup


## 7.1.2 Aug 11, 2021

Changes:

- Ensure `@polkadot/util-crypto` doesn't re-export `packageInfo` from `@polkadot/networks`
- Minor TS style cleanups in `@polkadot/x-bundle`


## 7.1.1 Aug 2, 2021

Contributed:

- Add keyring encrypt/decrypt functionality (Thanks to https://github.com/RoyTimes)

Changes:

- Bump Ledger libraries to latest versions


## 7.0.3 Jul 26, 2021

Changes:

- Sync with upstream Substrate ss58 registry
- Bump Ledger libraries to latest versions


## 7.0.2 Jul 19, 2021

Changes:

- Added `isCompact` utility for check on compact-like types
- Sync with upstream Substrate ss58 registry


## 7.0.1 Jul 11, 2021

- **Breaking change** The `@polkadot/x-rxjs` package has been removed. In `rxjs` 7.2.0 the compatibility issues at the base layer has been solved.
- **Breaking change** The named exports in `@polkadot/networks` has been changed

Contributed:

- Add Ledger config for Centrifuge (Thanks to https://github.com/mikiquantum)

Changes:

- Adjust `@polkadot/networks` to fully-descriptive exports
- Remove `@polkadot/x-rxjs`, direct import from `rxjs >= 7.2.0` required
- Allow building as a completely stand-alone browser bundle (experimental)
- Sync with upstream Substrate ss58 registry


## 6.11.1 Jul 5, 2021

Changes:

- Cleanup unneeded dependencies for `@polkadot/x-global`
- Sync with upstream Substrate ss58 registry
- Bump Zondax dependencies (Statemine slip44 fix)


## 6.10.1 Jun 26, 2021

Contributed:

- Add Karura genesisHash (Thanks to https://github.com/ntduan)

Changes:

- `isHex(value)` will now check for only `string` types (No `String` classes)
- Added `arrayShuffle(array)` to shuffle an array into a new output
- Added Statemine Ledger app information
- Simplify tests to use `{describe|it}.each` where applicable
- Sync with upstream Substrate ss58 registry


## 6.9.1 Jun 19, 2021

Changes:

- Added `u8aCmp(a, b)` to do sorting compares
- Added `arrayRange(size, startAt = 0)` to create a range of numbers
- Added extensive mnemonic compare test (optional, skipped)


## 6.8.1 Jun 14, 2021

Contributed:

- Add Ledger support for Edgeware (Thanks to https://github.com/raykyri)
- Fix `naclSeal` doc types (Thanks to https://github.com/agustinustheo)

Changes:

- Export `BN` in `@polkadot/util`
- Sync with upstream Substrate ss58 registry


## 6.7.1 Jun 6, 2021

Changes:

- Add WebHID transport for Ledger
- Update to latest Ledger transport packages
- Remove old `Gerald` key for Moonbeam
- Cleanup testing keyring semgrep recommendations


## 6.6.1 May 29, 2021

Changes:

- Adjust HD path validation & replacement
- Sync with Substrate ss58 registry


## 6.5.1 May 22, 2021

Changes:

- Allow hdLedger derivation with optional 25th word password
- Sync with Substrate ss58 registry


## 6.4.1 May 15, 2021

Contributed:

- Update genesis for HydraDx gen-3 (Thanks to https://github.com/jak-pan)
- Allow Ethereum pair in keyring addAddress (Thanks to https://github.com/joelamouche)

Changes:

- Added additional double-byte ss58 tests
- Aligned ss58 registry with Substrate
- Add explicit log for deprecation of `setSS58Format`


## 6.3.1 Apr 25, 2021

Changes:

- Added `stringify` util to correctly handle `JSON.stringify` with `BigInt` values
- Additional input asserts for non-convertible values in `u8aToU8a`
- Adapt `@polkadot/x-global` to return `globalThis` as available
- Minor readability cleanups
- BN manipulation via in-place shifts (as applicable)
- Add explicit `engines` config to `package.json`


## 6.2.1 Apr 18, 2021

Contributed:

- Added HydraDx genesis (Thanks to https://github.com/jak-pan)

Changes:

- Add `isAddress` and `validateAddress` functions (the latter will throw if invalid)
- Check `@polkadot/hw-ledger` against `@polkadot/networks` for discrepancies (test-only)
- Align ss58 registry with upstream Substrate


## 6.1.1 Apr 11, 2021

Contributed:

- Adjust Polymath genesis in `@polkadot/networks` (Thanks to https://github.com/adamdossa)
- Adjust `@polkadot/util` logger for +/-/* compat (Thanks to https://github.com/Lezek123)
- Fix typo in `@polkadot/util` detect messaging (Thanks to https://github.com/amphineko)

Changes:

- Remove `@polkadot/networks` code duplication, manages data via script from upstream
- Align ss58 registry with upstream Substrate


## 6.0.5 Mar 8, 2021

Changes:

- Fix for `@polkadot/x-rxjs` in Node CJS environments (no Node-specific import)


## 6.0.4 Mar 7, 2021

Contributed:

- Enhance check for global process existence (Thanks to https://github.com/Yuripetusko)

Changes:

- Dedupe & optimize logger process.env checks


## 6.0.3 Mar 5, 2021

Changes:

- Add import indirection for both CJS & ESM (where generated source file is commonjs)


## 6.0.2 Mar 5, 2021

Changes:

- Fix `@polkadot/x-rxjs` ESM exports for Node environments (now different due to the ESM conversion)


## 6.0.1 Mar 5, 2021

**Important** In the 6.0 version the default package type has been changed to ESM modules by default. This should not affect usage, however since the output formats changed, a new major version is required.

Contributed:

- Add dev addresses for Frontier-based chains (Thanks to https://github.com/joelamouche)

Changes:

- Build to ESM by default (with cjs versions via export map)
- Allow addition or raw pairs on the keyring via `{add, create}FromPair`
- Extract re-usable json encryption/decryption functions


## 5.9.2 Feb 28, 2021

Changes:

- Fix package detection for `@polkadot/networks` (no dependencies)


## 5.9.1 Feb 28, 2021

Changes:

- Expand `detectPackage` with optional param allowing checks for monorepo versions
- Export logger `format` function directly as `loggerFormat`
- Expand tests and checks for `hdValidatePath`
- Remove `hdEthereum` class-based approach, simplify
- Cleanup formatting on nested conditionals in the `@polkadot/x-` packages
- All packages now export `packageInfo` from the root


## 5.8.1 Feb 26, 2021

Contributed:

- Add ss58 information for HydraDX (Thanks to https://github.com/jak-pan)
- HD derivation for Ethereum (Thanks to https://github.com/joelamouche)

Changes:

- Adjust base64 encoding/decoding to not rely on Buffer being available
- Rework Ethereum derivation to only use Uint8Array internally
- Shared HD path validation for Ledger & Ethereum
- Additional derivation, encoding and decoding tests on keyring
- Align networks with upstream ss58 registry
- `@polkadot/wasm-crypto` 3.2.4


## 5.7.1 Feb 21, 2021

**Breaking change** The signature of `pair.verify` now requires the signer public key as a parameter. If using `pair.verify` pass the publicKey (hex or Uint8Array) of the signer.

Changes:

- The signature on the keyring for `.verify` now explicitly requires the `publicKey` of the signer. Previously it only verified against an own public key.
- Add additional ss58 test vectors (against chains with >63 prefixes in the Substrate registry)


## 5.6.3 Feb 16, 2021

Contributed:

- Add ss58 information for Aventus (Thanks to https://github.com/nahuseyoum)

Changes:

- Add `unlock(password)` to keypair (less confusing than only having `decodePkcs8`, equivalent to `lock()`)
- Change use of `detectPackage` to use `packageInfo.ts`
- Align with upstream ss58 registry
- `@polkadot/wasm-crypto` 3.2.3


## 5.6.2 Feb 8, 2021

Changes:

- `@polkadot/networks` now filters the new upstream-introduced `null` networks


## 5.6.1 Feb 7, 2021

Contributed:

- Fix installation instructions in `@polkadot/x-global` (Thanks to https://github.com/raoulmillais)

Changes:

- Conform to new ss58 encoding with ids up to 16,383 (>= 64 as 2 bytes)
- Use JS sqrt inside `bnSqrt` when value <= MAX_SAFE_INTEGER
- Adjust all `Buffer.from` usages, prefer `Uint8Array` where possible
- Expand tests for keyring with `vrf{Sign, Verify}`
- Align `@polkadot/networks` with latest ss58 registry


## 5.5.2 Feb 2, 2021

Changes:

- Expose `BN_{MILLION, BILLION}` constants (in addition to 2-9)


## 5.5.1 Jan 31, 2021

Changes:

- Added `hdLedger` to util-crypto for Ledger-compatible bip32+ed25519 derivation
- Added `hmac{Sha256, 512}` to util-crypto
- Add `slip44` indices for Ledger into `@polkadot/networks`
- Remove `module` entry in `package.json` (only rely on exports map)
- Remove direct references to `global` object, use `@polkadot/x-global`
- Update `@ledgerhq` dependencies to latest


## 5.4.1 Jan 24, 2021

Contributed:

- Adjust Ledger app lookup for Polymesh (Thanks to https://github.com/adamdossa)

Changes:

- Allow decimals as `number[]` & symbol as `string[]` in balanceFormat defaults
- Add `schnorrkelVrf{Sign, Verify}` to `@polkadot/util-crypto`
- Export `vrf{Sign, Verify}` on keyring interface
- Move `@polkadot/x-rxjs` packages from the api repo
- Align `@polkadot/networks` with Substrate master
- Explicit edcsa tests for derivation
- `@polkadot/wasm-crypto` 3.2.1


## 5.3.1 Jan 17, 2021

**Important** For users of the `@polkadot/ledger` package, it is now included in this repo (since it is a general utility) and renamed to `@polkadot/hw-ledger`

Contributed:

- Add Dock Ledger integration (Thanks to https://github.com/lovesh)
- Add Polymesh Ledger integration (Thanks to https://github.com/adamdossa)
- Add flag for Ledger capabilities on networks (Thanks to https://github.com/Tbaut)

Changes:

- Move `@polkadot/ledger` packages into common
- Update `@polkadot/networks` to align with latest Substrate ss58-registry


## 5.2.1 Dec 27, 2020

Changes:

- Add `arrayFlatten` to merge a series of arrays into a single
- Add `arrayChunk` to chunk an array into multiples of defined size
- Add `bitLength` param (allowed 256, 512) to `keccakAs{Hex, U8a}`
- Align `@polkadot/networks` with Substrate master


## 5.1.1 Dec 19, 2020

Changes:

- `detectPackage` now can take a path-retrieval callback as second argument
- Adjust `blake2js` imports to consistently cater for esm & cjs usage
- Explicitly mark `detectPackage` usage as having side-effects
- Align `@polkadot/networks` with Substrate master
- `@polkadot/wasm-crypto` 3.1.1


## 5.0.1 Dec 13, 2020

**Important** While this package contains no external interface changes, it now compiles and ships both cjs and esm modules. This means that modern bundlers will have more information for tree-shaking available. Additionally when using Node with `.mjs` extensions, the esm version imports will be used on recent Node versions. Adding an export map, as here, may have some impacts so a major semver bump is advised. There may be (small) dragons hiding in the dark corners...

Changes:

- Build and expose both cjs and esm via exports map
- Use `import type { ... }` form for all type imports
- Align with Substrate master network list
- Debug logs now don't depend on `NODE_ENV`, but rather `DEBUG=<type,type,...>` (`*` logs all)
- Limit debug console output via `DEBUG_MAX=<number>` value, trimming when passed
- Add `memoize` util, allowing for function memoization (as used in the API)
- Align `@polkadot/networks` with Substrate master
- `@polkadot/wasm-crypto` 3.0.1


## 4.2.1 Nov 23, 2020

Changes:

- Rename default Mega to Million, Giga to Billion and Tera to Trillion in formatter
- Dedupe bn.js by aligning versions between different libraries
- Add explicit link to base Substrate ss58 formats (as managed in `@polkadot/util`)


## 4.1.1 Nov 16, 2020

Contributed:

- Expand ETH tests, allow for verification against address (Thanks to https://github.com/joelamouche)

Changes:

- Replace pbkdf2 imports with explicit use from sync-only package
- Adjust secp256k1 imports with shared elliptic
- Expand crypto tests for explicit wasm vs JS compares in all cases


## 4.0.1 Nov 8, 2020

- **Breaking change** Polyfills are not injected by these libraries anymore to avoid clobbering external globals, the user should provide them if their environment is missing base functionality.

Changes:

- Remove built-in utility polyfills for `Array.fill`, `String.padStart`, `String.padEnd` as well as `Object.setPrototypeOf`. These should be provided by the actual user of the libraries if so required.
- Update `@polkadot/wasm-crypto` library (under-the-hood cleanups)
- Remove explicit crypto polyfill injection (aligning with updated `@polkadot/wasm-crypto`)
- Add cross-environment `@polkadot/x-randomvalues` (for use in `@polkadot/wasm-crypto`)


## 3.7.1 Nov 1, 2020

Changes:

- Remove the use of `chalk` (logger) for less overall dependencies
- `string*` utilities now also allows `String` (class) inputs
- Align bip39 use with wasm-crypto for English-only wordlist, default, non supplied)
- Adjust elliptic imports for explicit paths (allows tree-shaking)
- Add Totem (ss58 prefix 14) into `@polkadot/networks`
- Move `@polkadot/x-{fetch,textdecoder,textencoder,ws}` into `common` repo


## 3.6.1 Oct 18, 2020

Contributed:

- Add evmToAddress and addressToEvm `@polkadot/util-crypto` (Thanks to https://github.com/jnaviask)
- Remove invalid link to docs (thanks to https://github.com/roccomuso)

Changes:

- Rename `mnemonicToBip39` to `mnemonicToLegacySeed` (used in non-Substrate compatible fashion)
- Update pair signature verification to handle MultiSignature results
- Move documentation to docs repo
- Added `@polkadot/networks` for a list of known networks and their identifying information


## 3.5.1 Sep 27, 2020

Contributed:

- Add Dock network identifiers (Thanks to https://github.com/lovesh)

Changes:

- Use cross-environment TextDecoder & TextEncoder from the polkadot-js polyfills
- Add `isBase{32, 58, 64}` to `@polkadot/util-crypto`
- Add `base64{Pad, Trim}` to add/remove padding characters
- Add `createFromJson(json)` to keyring (create pair without adding)
- Balance formatter now outputs 4 numbers after the decimal point


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
