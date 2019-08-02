# 1.0.0

- `formatBalance` now allows for `Compact` inputs
- `formaBalance` now allows correct formatting of very large decimals

# 0.94.1

- Add `checkAddress(address, prefix)` to `@polkadot/util-crypto` that validates an ss-58 address
- Add support for the Kusama network (as a valid checked prefix)
- Add an `asm.js` fallback for the React Native environment (via `@polkadot/wasm-crypto`)
- The ed25519 key for Alice (representing the session), now appears in the test keyrings
- Fix missing dependencies for keyring (after address moves in 0.93.1)

# 0.93.1

- Breaking: External pair interface for keyring has been changed. Instead of
  - `getMeta` use the `meta` getter, i.e. `console.log(pair.meta.name)`
  - `address` use the `address` getter, i.e. `console.log(pair.address)`
  - `publicKey` use the `publicKey` getter, i.e. `console.log(pair.publicKey)`
- `Move decodeAddress`, `encodeAddress` & `setAddressPrefix` functions into `@polkadot/util-crypto` from `@polkadot/keyring`. External interfaces should not be affected at this point since it is also (still) exported and exposed on keyring

# 0.92.1

- Only allow integer input values into `formatBalance`
- Allow `formatBalance`, `formatDecimal` & `formatNumber` to cater for negative numbers
- Add 'Bob//stash' to testing keyring, joining the existing 'Alice//stash'

# 0.91.1

- ed25519/sr25519 sign & verify functions can now take the message input as Uint8Array/string/hex and verify allows for the signature/publicKey to be specified as Uint8Array/hex
- Update `@polkadot/wasm` to include a maintenance bump for the `w3f/schnorrkel` libraries

# 0.90.1

- Moving towards 1.0
- Added bnMin & bnMax functions

# 0.76.1

- Fix `addFromMnemonic` to generate using new-style derivation.
- Pull in `formatBalance`, `formatDecimal`, `formatElapsed`, `formatNumber`, `calcSi`, `findSi` & `isTestChain` utility functions from the originals in `@polkadot/ui-util`
- Swap out `wasm-schnorrkel` & `wasm-ed25519` for combined version with `wasm-crypto`
- Swap DB interfaces to optional LRU, removing `transactionAsync` (client-only changes)

# 0.75.1

- Start journey to 1.0

# 0.42.1

- Add `assertSingletonPackage` to util
- Ensure that only a single keyring instance is loaded (uses above)

# 0.41.1

- Extensions to the client-specific database interfaces (non-breaking for API and util users)

# 0.40.1

- Add additional derivation path extraction mechanisms to util-crypto
- Add createFromUri function to keypair (creates keypair, does not add it)
- Allow all crypto hashing & ed25519 to use WASM (as available, JS fallbacks)

# 0.39.1

- Pull in bip39 generation functions from `@poladkot/wasm-crypto` with a fallback to the pure JS versions

# 0.38.1

- Align with current substrate master for sr25519 keys and hard/soft derivation
- Swap default dev keys to derived (sr25519)

# 0.37.1

- Swap to publishing -beta.x on merge (non-breaking testing)

# 0.36.1

- Add `fromUri` to keyring along with hard & soft key derivation.

# 0.35.1

- Remove NodeJs-only `syncify` function, not exported by the package (with binary dependency for Node)

# 0.34.1

- Keyring now allows for ed25519 and sr25519 instances. Upon creation, you need to pass the `ed25519`or `sr25519` string to denote the type, i.e. `new Keyring({ type: 'sr25519' })`
