/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars */
const { mnemonicGenerate, mnemonicToSeed, mnemonicValidate, naclKeypairFromSeed } = require('@polkadot/util-crypto');

async function main () {
  // Create mnemonic string for Alice using BIP39
  const mnemonicAlice = mnemonicGenerate();

  console.log(`Generated mnemonic: ${mnemonicAlice}`);

  // Validate the mnemic string that was generated
  const isValidMnemonic = mnemonicValidate(mnemonicAlice);

  console.log(`isValidMnemonic: ${isValidMnemonic}`);

  // Create valid seed from mnemonic as u8a and convert it to a string
  // FIXME - Replace with mnemonicToSeed once exposed
  const seedAlice = mnemonicToSeed(mnemonicAlice);

  // Generate new public/secret keypair for Alice from the supplied seed
  const { secretKey, publicKey } = naclKeypairFromSeed(seedAlice);

  // Encrypt, Sign and Validate the message. See Example 'Sign & Verify Message'
}

main().catch(console.error).finally(() => process.exit());
