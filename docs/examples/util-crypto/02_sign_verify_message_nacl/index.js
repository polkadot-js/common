const stringToU8a = require('@polkadot/util/string/toU8a').default;
const { randomAsU8a } = require('@polkadot/util-crypto');

const { naclKeypairFromSeed } = require('@polkadot/util-crypto');
const { naclEncrypt } = require('@polkadot/util-crypto');
const { naclSign } = require('@polkadot/util-crypto');
const { naclVerify } = require('@polkadot/util-crypto');

async function main () {
  // Create account seed for Alice as fallback if generated mnemonic not valid
  const seedAlice = 'Alice'.padEnd(32, ' ');

  // Generate new public/secret keypair for Alice from the supplied seed
  const { secretKey, publicKey } = naclKeypairFromSeed(stringToU8a(seedAlice));

  // Encrypt message. Create Uint8Array's filled with random bytes of specified length
  const secret = randomAsU8a(32);
  const messagePreEncryption = stringToU8a('please send me DOTs');
  const noncePreEncryption = randomAsU8a(24);

  const { encrypted, nonce } = naclEncrypt(messagePreEncryption, secret, noncePreEncryption);

  // Sign the message with a valid signature
  const messageSignature = naclSign(encrypted, secretKey);

  // Validate that the message was correctly signed
  const isValidSignature = naclVerify(encrypted, messageSignature, publicKey);

  console.log(`Was the message correctly signed? ${isValidSignature}`);
}

main().catch(console.error).finally(_ => process.exit());
