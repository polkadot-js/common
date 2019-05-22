# 0.91.1

- ed25519/sr25519 sign & verify functions can now take the message input as Uint8Array/string/hex and verify allows for the signature/publicKey to be specified as Uint8Array/hex
- Update `@polkadot/wasm` to include a maintenance bump for the `w3f/schnorrkel` libraries

# 0.90.1

- Moving towards 1.0
- Added bnMin & bnMax functions

# 0.76.1

- Fix `addFromMnemonic` to generate using new-style derivation.
- Pull in formatBalance, formatDecimal, formatElapsed, formatNumber, calcSi, findSi & isTestChain util fuinctions from the originals in @polkadot/ui-util
- Swap DB interfaces to optional LRU, removing transactionAsync (client-only changes)
- Swap out `wasm-schnorrkel` & `wasm-ed25519` for combined version with `wasm-crypto`

# 0.75.1

- Start journey to 1.0

# 0.42.1

- Add assertSingletonPackage to util
- Ensure that only a single keyring instance is loaded (uses above)

# 0.41.1

- Extensions to the client-specific database interfaces (non-breaking for API and util users)

# 0.40.1

- Add additional derivation path extraction mechanisms to util-crypto
- Add createFromUri function to keypair (creates keypair, does not add it)
- Allow all crypto hashing & ed25519 to use WASM (as available, JS fallbacks)

# 0.39.1

- Pull in bip39 generation functions from @poladkot/wasm-crypto with a fallback to the pure JS versions

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
