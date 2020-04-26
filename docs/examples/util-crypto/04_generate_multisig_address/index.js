/* eslint-disable header/header */
import { createKeyMulti, encodeAddress, sortAddresses } from '@polkadot/util-crypto';

const SS58Prefix = 0;

// Input the addresses that will make up the multisig account.
const addresses = [
  '1nUC7afqmo7zwRFWxDjrUQu9skk6fk99pafb4SiyGSRc8z3',
  '1ZX2XntfLEHrBPy73DpfQp9rG7pbLyvrFjEpi7mNKQgyga5',
  '14b1kB7CrqzRUeMsKc26FJ73f8FCpxAX6sNieu9gfYSfJuoL'
];

// The number of accounts that must approve. Must be greater than 0 and less than
// or equal to the total number of addresses.
const threshold = 2;

// The address (as index in `addresses`) that will submit a transaction.
const index = 0;

function main () {
  // Address as a byte array.
  const multiAddress = createKeyMulti(addresses, threshold);

  // Convert byte array to SS58 encoding.
  const Ss58Address = encodeAddress(multiAddress, SS58Prefix);

  console.log(`\nMultisig Address: ${Ss58Address}`);

  // Take addresses and remove the sender.
  const otherSignatories = addresses.filter((who) => who !== addresses[index]);

  // Sort them by public key.
  const otherSignatoriesSorted = sortAddresses(otherSignatories, SS58Prefix);

  console.log(`\nOther Signatories: ${otherSignatoriesSorted}\n`);

  process.exit();
}

main();
