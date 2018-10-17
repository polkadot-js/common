// Import Keyring class and utility function
const Keyring = require('@polkadot/keyring').default;
const u8aFromUtf8 = require('@polkadot/util/u8a/fromUtf8').default;

async function main () {
  // Create account seed for Alice
  const ALICE_SEED = 'Alice'.padEnd(32, ' ');

  // Create an instance of the Keyring
  const keyring = new Keyring();

  // Create pair and add Alice to keyring pair dictionary (with account seed)
  keyring.addFromSeed(u8aFromUtf8(ALICE_SEED));
}

main().catch(console.error).finally(_ => process.exit());
