// Import Keyring class and utility function
const Keyring = require('@polkadot/keyring').default;
const stringToU8a = require('@polkadot/util/string/toU8a').default;

async function main () {
  // Create account seed for Alice
  const ALICE_SEED = 'Alice'.padEnd(32, ' ');

  // Create an instance of the Keyring
  const keyring = new Keyring();

  // Create pair and add Alice to keyring pair dictionary (with account seed)
  keyring.addFromSeed(stringToU8a(ALICE_SEED));
}

main().catch(console.error).finally(_ => process.exit());
