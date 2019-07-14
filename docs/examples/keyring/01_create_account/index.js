/* eslint-disable @typescript-eslint/no-var-requires */
// Import Keyring class and utility function
const Keyring = require('@polkadot/keyring').default;
const stringToU8a = require('@polkadot/util/string/toU8a').default;

async function main () {
  // Create account seed for Alice
  const ALICE_SEED = 'Alice'.padEnd(32, ' ');

  // Create an instance of the Keyring
  const keyring = new Keyring();

  // Create pair and add Alice to keyring pair dictionary (with account seed)
  const pairAlice = keyring.addFromSeed(stringToU8a(ALICE_SEED));

  console.log(`Created keyring pair for Alice with address: ${keyring.getPair(pairAlice.address).address}`);
}

main().catch(console.error).finally(() => process.exit());
