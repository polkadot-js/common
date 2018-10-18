// Import Keyring class and utility function
const Keyring = require('@polkadot/keyring').default;
const stringToU8a = require('@polkadot/util/string/toU8a').default;

async function main () {
  // Create account seed for Alice
  const ALICE_SEED = 'Alice'.padEnd(32, ' ');

  // Create address for Bob
  const BOB_ADDR = '5Gw3s7q4QLkSWwknsiPtjujPv3XM4Trxi5d4PgKMMk3gfGTE';

  // Create an instance of the Keyring
  const keyring = new Keyring();

  // Create Alice's pair with account seed. Add to keyring pair dictionary
  keyring.addFromSeed(stringToU8a(ALICE_SEED));

  // Create Bob's pair with account address. Add to keyring pair dictionary
  keyring.addFromAddress(BOB_ADDR);

  // Retrieve all keyring pairs from the keyring pair dictionary
  keyring
    .getPairs()
    .forEach((pair, index) => {
      const address = pair.address();

      console.log(`${index} account has json: `,
        JSON.stringify(keyring.toJson(address), null, 2));
    });
}

main().catch(console.error).finally(_ => process.exit());
