# 0.38.1

- Align with current substrate master for sr25519 keys and hard/soft derivation
- Swap default keyring to sr25519

# 0.37.1

- Swap to publishing -beta.x on merge (non-breaking testing)

# 0.36.1

- Add `fromUri` to keyring along with hard & soft key derivation.

# 0.35.1

- Remove NodeJs-only `syncify` function, not exported by the package (with binary dependency for Node)

# 0.34.1

- Keyring now allows for ed25519 and sr25519 instances. Upon creation, you need to pass the `ed25519`or `sr25519` string to denote the type, i.e. `new Keyring({ type: 'sr25519' })`
