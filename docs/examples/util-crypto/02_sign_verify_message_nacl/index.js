/* eslint-disable @typescript-eslint/no-var-requires */
const { stringToU8a, u8aToHex } = require('@polkadot/util');
const { naclEncrypt, naclKeypairFromSeed, naclSign, naclVerify, randomAsU8a } = require('@polkadot/util-crypto');

async function main () {
  // Create account seed for Alice as fallback if generated mnemonic not valid
  const seedAlice = 'Alice'.padEnd(32, ' ');

  // Generate new public/secret keypair for Alice from the supplied seed
  const { secretKey, publicKey } = naclKeypairFromSeed(stringToU8a(seedAlice));

  // Encrypt message. Create Uint8Array's filled with random bytes of specified length
  const secret = randomAsU8a(32);
  const messagePreEncryption = stringToU8a('please send me DOTs');
  const noncePreEncryption = randomAsU8a(24);

  const { encrypted } = naclEncrypt(messagePreEncryption, secret, noncePreEncryption);

  // Sign the message with a valid signature
  const messageSignature = naclSign(encrypted, secretKey);

  console.log(`Message signature: ${u8aToHex(messageSignature)}`);

  // Validate that the message was correctly signed
  const isValidSignature = naclVerify(encrypted, messageSignature, publicKey);

  console.log(`Was the message correctly signed? ${isValidSignature}`);
}

main().catch(console.error).finally(() => process.exit());
