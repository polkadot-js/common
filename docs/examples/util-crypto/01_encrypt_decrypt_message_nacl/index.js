/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
const { naclEncrypt, naclDecrypt } = require('@polkadot/util-crypto');

async function main () {
  const secret = new Uint8Array(32);
  const messagePreEncryption = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);
  const noncePreEncryption = new Uint8Array(24);

  // Encrypt the message
  const { encrypted, nonce } = naclEncrypt(messagePreEncryption, secret, noncePreEncryption);

  // Show contents of the encrypted message
  console.log(`Encrypted message: ${JSON.stringify(encrypted, null, 2)}`);

  // Decrypt the message
  const messageDecrypted = naclDecrypt(encrypted, nonce, secret);
  // Convert each Uint8Array to a string for comparison
  const isMatch = messagePreEncryption.toString === messageDecrypted.toString;

  // Verify that the decrypted message matches the original message
  console.log(`Does the decrypted message match the original message? ${isMatch}`);
}

main().catch(console.error).finally(() => process.exit());
