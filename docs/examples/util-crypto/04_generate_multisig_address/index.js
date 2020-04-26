/* eslint-disable header/header */
import { createKeyMulti, encodeAddress } from '@polkadot/util-crypto';

function main () {
  // Input the addresses that will make up the multisig account. This utility
  // will sort them for you but when you submit to a Substrate node, you must
  // sort them yourself.
  const addresses = [
    '1nUC7afqmo7zwRFWxDjrUQu9skk6fk99pafb4SiyGSRc8z3',
    '1ZX2XntfLEHrBPy73DpfQp9rG7pbLyvrFjEpi7mNKQgyga5',
    '14b1kB7CrqzRUeMsKc26FJ73f8FCpxAX6sNieu9gfYSfJuoL'
  ];

  // The number of accounts that must approve. Must be greater than 0 and less than
  // or equal to the total number of addresses.
  const threshold = 2;

  // Address as a byte array.
  const multiAddress = createKeyMulti(addresses, threshold);

  // Convert byte array to SS58 encoding. Second arg is SS58 prefix.
  const Ss58Address = encodeAddress(multiAddress, 0);

  console.log(`Multisig Address: ${Ss58Address}`);

  process.exit();
}

main();
