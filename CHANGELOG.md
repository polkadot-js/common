# 0.35.1

- Remove NodeJs-only `syncify` function, not exported by the package (with binary dependency for Node)

# 0.34.1

- Keyring now allows for ed25519 and sr25519 instances. Upon creation, you need to pass the `ed25519`or `sr25519` string to denote the type, i.e. `new Keyring({ type: 'sr25519' })`
