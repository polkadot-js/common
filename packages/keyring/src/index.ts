// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringInstance, KeyringPair, KeyringPair$Json, KeyringPair$Meta } from './types';

import { hexToU8a } from '@polkadot/util/index';
import { mnemonicToSeed , naclKeypairFromSeed } from '@polkadot/util-crypto/index';

import { decodeAddress, encodeAddress, setAddressPrefix } from './address';
import createPair from './pair';
import Pairs from './pairs';

/**
 * # @polkadot/common/keyring
 *
 * ## Overview
 *
 * @name Keyring
 * @summary Keyring management of user accounts
 * @description Allows generation of keyring pairs from a variety of input combinations, such as
 * json object containing account address or public key, account metadata, and account encoded using
 * `addFromJson`, or by providing those values as arguments separately to `addFromAddress`,
 * or by providing the mnemonic (seed phrase) and account metadata as arguments to `addFromMnemonic`.
 * Stores the keyring pairs in a keyring pair dictionary. Removal of the keyring pairs from the keyring pair
 * dictionary is achieved using `removePair`. Retrieval of all the stored pairs via `getPairs` or perform
 * lookup of a pair for a given account address or public key using `getPair`. JSON metadata associated with
 * an account may be obtained using `toJson` accompanied by the account passphrase.
 * @example See [Polkadot-JS Common Keyring Examples](https://polkadot.js.org/api/common/examples/keyring/) and the [Polkadot-JS Apps ui-keyring package](https://github.com/polkadot-js/apps/tree/master/packages/ui-keyring)
 * where it is implemented.
 */
export default class Keyring implements KeyringInstance {
  private _pairs: Pairs;

  constructor () {
    this._pairs = new Pairs();
  }

  decodeAddress = decodeAddress;
  encodeAddress = encodeAddress;
  setAddressPrefix = setAddressPrefix;

  /**
   * @name addPair
   * @signature addPair (pair: KeyringPair): KeyringPair
   * @summary Stores an account, given a keyring pair, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   */
  addPair (pair: KeyringPair): KeyringPair {
    return this._pairs.add(pair);
  }

  /**
   * @name addFromAddress
   * @signature addFromAddress (address: string | Uint8Array, meta?: KeyringPair$Meta, defaultEncoded?: Uint8Array): KeyringPair
   * @summary Stores an account, given an account address, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to explicitely provide separate inputs including account address or public key, and optionally
   * the associated account metadata, and the default encoded value as arguments (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from them that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  addFromAddress (address: string | Uint8Array, meta?: KeyringPair$Meta, defaultEncoded?: Uint8Array): KeyringPair {
    // @ts-ignore no secretKey - cannot unlock
    return this.addPair(createPair({ publicKey: this.decodeAddress(address) }, meta, defaultEncoded));
  }

  /**
   * @name addFromJson
   * @signature addFromJson ({ address, encoded, meta }: KeyringPair$Json): KeyringPair
   * @summary Stores an account, given JSON data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to provide a json object argument that contains account information (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from it that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   * @example
   * Refer to an actual implementation in [Polkadot-JS ui-keyring > account > save](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/account/save.ts#L15)
   */
  addFromJson ({ address, encoded, meta }: KeyringPair$Json): KeyringPair {
    return this.addFromAddress(address, meta, hexToU8a(encoded));
  }

  /**
   * @name addFromMnemonic
   * @signature addFromMnemonic (mnemonic: string, meta?: KeyringPair$Meta): KeyringPair
   * @summary Stores an account, given a mnemonic, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to provide a mnemonic (seed phrase that is provided when account is originally created)
   * argument and a metadata argument that contains account information (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from it that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  addFromMnemonic (mnemonic: string, meta?: KeyringPair$Meta): KeyringPair {
    return this.addFromSeed(mnemonicToSeed(mnemonic), meta);
  }

  /**
   * @name addFromSeed
   * @signature addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair
   * @summary Stores an account, given seed data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Stores in a keyring pair dictionary the public key of the pair as a key and the pair as the associated value.
   * Allows user to provide the account seed as an argument, and then generates a keyring pair from it that it passes to
   * `addPair` to store in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   * @example
   * <BR>
   *
   * ```javascript
   * import Keyring from '@polkadot/keyring';
   * import stringToU8a from '@polkadot/util/string/toU8a';
   *
   * const ALICE_SEED = 'Alice'.padEnd(32, ' ');
   *
   * // Create an instance of the Keyring
   * const keyring = new Keyring();
   *
   * // Add Alice to our keyring pair dictionary (with the known seed for the account)
   * const pairAlice = keyring.addFromSeed(stringToU8a(ALICE_SEED));
   * ```
   *
   * Refer to an actual implementation in [Polkadot-JS ui-keyring > account > create](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/account/create.ts#L11)
   */
  addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair {
    return this.addPair(createPair(naclKeypairFromSeed(seed), meta));
  }

  /**
   * @name getPair
   * @signature getPair (address: string | Uint8Array): KeyringPair
   * @summary Retrieves an account keyring pair from the Keyring Pair Dictionary, given an account address
   * @description Returns a keyring pair value from the keyring pair dictionary by performing
   * a key lookup using the provided account address or public key (after decoding it).
   * @example
   * <BR>
   *
   * ```javascript
   * import Keyring from '@polkadot/keyring';
   * import stringToU8a from '@polkadot/util/string/toU8a';
   *
   * const ALICE_SEED = 'Alice'.padEnd(32, ' ');
   *
   * // Create an instance of the Keyring
   * const keyring = new Keyring();
   *
   * // Add Alice to our keyring pair dictionary (with the known seed for the account)
   * const pairAlice = keyring.addFromSeed(stringToU8a(ALICE_SEED));
   *
   * // Retrieve the same pair that is stored in the keyring pair dictionary by
   * // providing the account address as an argument, and also the public key as an argument.
   * // The pairs that are returned should both be the same value as `pairAlice` above
   * const pairAliceRetrievedWithAddress = keyring.getPair(pairAlice.address());
   * const pairAliceRetrievedWithPublicKey = keyring.getPair(pairAlice.publicKey());
   *
   * // Check if all returned pairs are the same
   * console.log(`Are all pairs the same? : ` +
   *   `${pairAlice === pairAliceRetrievedWithAddress === pairAliceRetrievedWithPublicKey}`);
   * ```
   */
  getPair (address: string | Uint8Array): KeyringPair {
    return this._pairs.get(address);
  }

  /**
   * @name getPairs
   * @signature getPairs (): Array<KeyringPair>
   * @summary Retrieves all account keyring pairs from the Keyring Pair Dictionary
   * @description Returns an array list of all the keyring pair values that are stored in the keyring pair dictionary.
   * @example
   * <BR>
   *
   * ```javascript
   * import testKeyring from '@polkadot/keyring/testing';
   *
   * // Create an instance of Keyring that includes test accounts
   * const keyring = testingPairs();
   *
   * keyring
   *   .getPairs()
   *   .forEach((pair) => {
   *     const address = pair.address();
   *
   *     keyring.addPair(address, {
   *       address,
   *       meta: pair.getMeta()
   *     });
   *   });
   * ```
   *
   * Refer to an actual implementation in [Polkadot-JS ui-keyring > loadAll](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/loadAll.ts)
   */
  getPairs (): Array<KeyringPair> {
    return this._pairs.all();
  }

  /**
   * @name getPublicKeys
   * @signature getPublicKeys (): Array<Uint8Array>
   * @summary Retrieves Public Keys of all Keyring Pairs stored in the Keyring Pair Dictionary
   * @description Returns an array list of all the public keys associated with each of the keyring pair values that are stored in the keyring pair dictionary.
   */
  getPublicKeys (): Array<Uint8Array> {
    return this._pairs
      .all()
      .map(({ publicKey }) =>
        publicKey()
      );
  }

  /**
   * @name removePair
   * @signature removePair (address: string | Uint8Array): void
   * @description Deletes the provided input address or public key from the stored Keyring Pair Dictionary.
   * @example
   * Refer to an actual implementation in [Polkadot-JS ui-keyring > account > forget](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/account/forget.ts)
   */
  removePair (address: string | Uint8Array): void {
    this._pairs.remove(address);
  }

  /**
   * @name toJson
   * @signature toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json
   * @summary Returns a JSON object associated with the input argument that contains metadata assocated with an account
   * @description Returns a JSON object containing the metadata associated with an account
   * when valid address or public key and when the account passphrase is provided if the account secret
   * is not already unlocked and available in memory. Note that in [Polkadot-JS Apps](https://github.com/polkadot-js/apps) the user
   * may backup their account to a JSON file that contains this information.
   * @example
   * Refer to an actual implementation in [Polkadot-JS ui-keyring > account > save](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/account/save.ts#L9)
   */
  toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json {
    return this._pairs.get(address).toJson(passphrase);
  }
}

export { Keyring, decodeAddress, encodeAddress, setAddressPrefix };
