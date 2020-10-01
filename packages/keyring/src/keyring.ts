// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { KeypairType, Keypair } from '@polkadot/util-crypto/types';
import { KeyringInstance, KeyringPair, KeyringPair$Json, KeyringPair$JsonEncodingTypes, KeyringPair$Meta, KeyringOptions } from './types';

import { assert, hexToU8a, isHex, isUndefined, stringToU8a } from '@polkadot/util';
import { base64Decode, decodeAddress, encodeAddress, keyExtractSuri, keyFromPath, naclKeypairFromSeed as naclFromSeed, schnorrkelKeypairFromSeed as schnorrkelFromSeed, secp256k1KeypairFromSeed as secp256k1FromSeed, mnemonicToLegacySeed, mnemonicToMiniSecret } from '@polkadot/util-crypto';

import { DEV_PHRASE } from './defaults';
import createPair from './pair';
import Pairs from './pairs';

const keypairFromSeed = {
  ecdsa: (seed: Uint8Array): Keypair => secp256k1FromSeed(seed),
  ed25519: (seed: Uint8Array): Keypair => naclFromSeed(seed),
  ethereum: (seed: Uint8Array): Keypair => secp256k1FromSeed(seed),
  sr25519: (seed: Uint8Array): Keypair => schnorrkelFromSeed(seed)
};

/**
 * # @polkadot/keyring
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
 */
export default class Keyring implements KeyringInstance {
  readonly #pairs: Pairs;

  readonly #type: KeypairType;

  #ss58?: number;

  public decodeAddress = decodeAddress;

  constructor (options: KeyringOptions = {}) {
    options.type = options.type || 'ed25519';

    assert(options && ['ecdsa', 'ethereum', 'ed25519', 'sr25519'].includes(options.type || 'undefined'), `Expected a keyring type of either 'ed25519', 'sr25519' or 'ecdsa', found '${options.type}`);

    this.#pairs = new Pairs();
    this.#ss58 = options.ss58Format;
    this.#type = options.type;
  }

  /**
   * @description retrieve the pairs (alias for getPairs)
   */
  public get pairs (): KeyringPair[] {
    return this.getPairs();
  }

  /**
   * @description retrieve the publicKeys (alias for getPublicKeys)
   */
  public get publicKeys (): Uint8Array[] {
    return this.getPublicKeys();
  }

  /**
   * @description Returns the type of the keyring, ed25519, sr25519 or ecdsa
   */
  public get type (): KeypairType {
    return this.#type;
  }

  /**
   * @name addPair
   * @summary Stores an account, given a keyring pair, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   */
  public addPair (pair: KeyringPair): KeyringPair {
    return this.#pairs.add(pair);
  }

  /**
   * @name addFromAddress
   * @summary Stores an account, given an account address, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to explicitely provide separate inputs including account address or public key, and optionally
   * the associated account metadata, and the default encoded value as arguments (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from them that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  public addFromAddress (address: string | Uint8Array, meta: KeyringPair$Meta = {}, encoded: Uint8Array | null = null, type: KeypairType = this.type, ignoreChecksum?: boolean, encType?: KeyringPair$JsonEncodingTypes[]): KeyringPair {
    const publicKey = this.decodeAddress(address, ignoreChecksum);

    return this.addPair(createPair({ toSS58: this.encodeAddress, type }, { publicKey, secretKey: new Uint8Array() }, meta, encoded, encType));
  }

  /**
   * @name addFromJson
   * @summary Stores an account, given JSON data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to provide a json object argument that contains account information (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from it that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  public addFromJson (json: KeyringPair$Json, ignoreChecksum?: boolean): KeyringPair {
    return this.addPair(this.createFromJson(json, ignoreChecksum));
  }

  /**
   * @name addFromMnemonic
   * @summary Stores an account, given a mnemonic, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to provide a mnemonic (seed phrase that is provided when account is originally created)
   * argument and a metadata argument that contains account information (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from it that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  public addFromMnemonic (mnemonic: string, meta: KeyringPair$Meta = {}, type: KeypairType = this.type): KeyringPair {
    return this.addFromUri(mnemonic, meta, type);
  }

  /**
   * @name addFromSeed
   * @summary Stores an account, given seed data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Stores in a keyring pair dictionary the public key of the pair as a key and the pair as the associated value.
   * Allows user to provide the account seed as an argument, and then generates a keyring pair from it that it passes to
   * `addPair` to store in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  public addFromSeed (seed: Uint8Array, meta: KeyringPair$Meta = {}, type: KeypairType = this.type): KeyringPair {
    return this.addPair(createPair({ toSS58: this.encodeAddress, type }, keypairFromSeed[type](seed), meta, null));
  }

  /**
   * @name addFromUri
   * @summary Creates an account via an suri
   * @description Extracts the phrase, path and password from a SURI format for specifying secret keys `<secret>/<soft-key>//<hard-key>///<password>` (the `///password` may be omitted, and `/<soft-key>` and `//<hard-key>` maybe repeated and mixed). The secret can be a hex string, mnemonic phrase or a string (to be padded)
   */
  public addFromUri (suri: string, meta: KeyringPair$Meta = {}, type: KeypairType = this.type): KeyringPair {
    return this.addPair(
      this.createFromUri(suri, meta, type)
    );
  }

  /**
   * @name createFromJson
   * @description Creates a pair from a JSON keyfile
   */
  public createFromJson ({ address, encoded, encoding: { content, type, version }, meta }: KeyringPair$Json, ignoreChecksum?: boolean): KeyringPair {
    const cryptoType = version === '0' || !Array.isArray(content)
      ? this.type
      : content[1];
    const encType = !Array.isArray(type)
      ? [type]
      : type;
    const publicKey = isHex(address)
      ? hexToU8a(address)
      : this.decodeAddress(address, ignoreChecksum);
    const decoded = isHex(encoded)
      ? hexToU8a(encoded)
      : base64Decode(encoded);

    return createPair({ toSS58: this.encodeAddress, type: cryptoType }, { publicKey, secretKey: new Uint8Array() }, meta, decoded, encType);
  }

  /**
   * @name createFromUri
   * @summary Creates a Keypair from an suri
   * @description This creates a pair from the suri, but does not add it to the keyring
   */
  public createFromUri (_suri: string, meta: KeyringPair$Meta = {}, type: KeypairType = this.type): KeyringPair {
    // here we only aut-add the dev phrase if we have a hard-derived path
    const suri = _suri.startsWith('//')
      ? `${DEV_PHRASE}${_suri}`
      : _suri;
    const { password, path, phrase } = keyExtractSuri(suri);
    let seed: Uint8Array;

    if (isHex(phrase, 256)) {
      seed = hexToU8a(phrase);
    } else {
      const str = phrase as string;
      const parts = str.split(' ');

      if ([12, 15, 18, 21, 24].includes(parts.length)) {
        seed = type === 'ethereum'
          ? mnemonicToLegacySeed(phrase)
          : mnemonicToMiniSecret(phrase, password);
      } else {
        assert(str.length <= 32, 'specified phrase is not a valid mnemonic and is invalid as a raw seed at > 32 bytes');

        seed = stringToU8a(str.padEnd(32));
      }
    }

    // FIXME Need to support Ethereum-type derivation paths
    const derived = keyFromPath(keypairFromSeed[type](seed), path, type);

    return createPair({ toSS58: this.encodeAddress, type }, derived, meta, null);
  }

  /**
   * @name encodeAddress
   * @description Encodes the input into an ss58 representation
   */
  public encodeAddress = (address: Uint8Array | string, ss58Format?: number): string => {
    return encodeAddress(address, isUndefined(ss58Format) ? this.#ss58 : ss58Format);
  }

  /**
   * @name getPair
   * @summary Retrieves an account keyring pair from the Keyring Pair Dictionary, given an account address
   * @description Returns a keyring pair value from the keyring pair dictionary by performing
   * a key lookup using the provided account address or public key (after decoding it).
   */
  public getPair (address: string | Uint8Array): KeyringPair {
    return this.#pairs.get(address);
  }

  /**
   * @name getPairs
   * @summary Retrieves all account keyring pairs from the Keyring Pair Dictionary
   * @description Returns an array list of all the keyring pair values that are stored in the keyring pair dictionary.
   */
  public getPairs (): KeyringPair[] {
    return this.#pairs.all();
  }

  /**
   * @name getPublicKeys
   * @summary Retrieves Public Keys of all Keyring Pairs stored in the Keyring Pair Dictionary
   * @description Returns an array list of all the public keys associated with each of the keyring pair values that are stored in the keyring pair dictionary.
   */
  public getPublicKeys (): Uint8Array[] {
    return this.#pairs
      .all()
      .map(({ publicKey }): Uint8Array =>
        publicKey
      );
  }

  /**
   * @name removePair
   * @description Deletes the provided input address or public key from the stored Keyring Pair Dictionary.
   */
  public removePair (address: string | Uint8Array): void {
    this.#pairs.remove(address);
  }

  /**
   * @name setSS58Format;
   * @description Sets the ss58 format for the keyring
   */
  public setSS58Format (ss58: number): void {
    this.#ss58 = ss58;
  }

  /**
   * @name toJson
   * @summary Returns a JSON object associated with the input argument that contains metadata assocated with an account
   * @description Returns a JSON object containing the metadata associated with an account
   * when valid address or public key and when the account passphrase is provided if the account secret
   * is not already unlocked and available in memory. Note that in [Polkadot-JS Apps](https://github.com/polkadot-js/apps) the user
   * may backup their account to a JSON file that contains this information.
   */
  public toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json {
    return this.#pairs.get(address).toJson(passphrase);
  }
}
