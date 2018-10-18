// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeypairType } from '@polkadot/util-crypto/types';
import { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '../types';
import { PairState } from './types';

import { naclSign, naclVerify } from '@polkadot/util-crypto/index';

import encodeAddress from '../address/encode';
import decode from './decode';
import encode from './encode';
import getMeta from './getMeta';
import setMeta from './setMeta';
import toJson from './toJson';

/**
 * @name pair
 * @signature pair ({ publicKey, secretKey }: KeypairType, meta: KeyringPair$Meta = {}, defaultEncoded?: Uint8Array): KeyringPair
 * @summary Creates a keyring pair object
 * @description Creates a keyring pair object with provided account public key, metadata, and encoded arguments.
 * The keyring pair stores the account state including the encoded address and associated metadata.
 *
 * It has properties whose values are functions that may be called to perform account actions:
 *
 * - `address` function retrieves the address associated with the account.
 * - `decodedPkcs8` function is called with the account passphrase and account encoded public key.
 * It decodes the encoded public key using the passphrase provided to obtain the decoded account public key
 * and associated secret key that are then available in memory, and changes the account address stored in the
 * state of the pair to correspond to the address of the decoded public key.
 * - `encodePkcs8` function when provided with the correct passphrase associated with the account pair
 * and when the secret key is in memory (when the account pair is not locked) it returns an encoded
 * public key of the account.
 * - `getMeta` returns the metadata that is stored in the state of the pair, either when it was originally
 * created or set via `setMeta`.
 * - `publicKey` returns the public key stored in memory for the pair.
 * - `sign` may be used to return a signature by signing a provided message with the secret
 * key (if it is in memory) using Nacl.
 * - `toJson` calls another `toJson` function and provides the state of the pair,
 * it generates arguments to be passed to the other `toJson` function including an encoded public key of the account
 * that it generates using the secret key from memory (if it has been made available in memory)
 * and the optionally provided passphrase argument. It passes a third boolean argument to `toJson`
 * indicating whether the public key has been encoded or not (if a passphrase argument was provided then it is encoded).
 * The `toJson` function that it calls returns a JSON object with properties including the `address`
 * and `meta` that are assigned with the values stored in the corresponding state variables of the account pair,
 * an `encoded` property that is assigned with the encoded public key in hex format, and an `encoding`
 * property that indicates whether the public key value of the `encoded` property is encoded or not.
 */
export default function pair ({ publicKey, secretKey }: KeypairType, meta: KeyringPair$Meta = {}, defaultEncoded?: Uint8Array): KeyringPair {
  const state: PairState = {
    address: encodeAddress(publicKey),
    meta: { ...meta }
  };

  return {
    address: (): string =>
      state.address,
    decodePkcs8: (passphrase?: string, encoded?: Uint8Array): void => {
      const decoded = decode(passphrase, encoded || defaultEncoded);

      publicKey = decoded.publicKey;
      secretKey = decoded.secretKey;
      state.address = encodeAddress(publicKey);
    },
    encodePkcs8: (passphrase?: string): Uint8Array =>
      encode(secretKey, passphrase),
    getMeta: (): KeyringPair$Meta =>
      getMeta(state),
    isLocked: (): boolean =>
      (!secretKey || secretKey.length === 0),
    lock: (): void => {
      secretKey = new Uint8Array(0);
    },
    publicKey: (): Uint8Array =>
      publicKey,
    setMeta: (meta: KeyringPair$Meta): void =>
      setMeta(state, meta),
    sign: (message: Uint8Array): Uint8Array =>
      naclSign(message, secretKey),
    toJson: (passphrase?: string): KeyringPair$Json =>
      toJson(state, encode(secretKey, passphrase), !!passphrase),
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      naclVerify(message, signature, publicKey)
  };
}
