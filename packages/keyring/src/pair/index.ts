// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '@polkadot/util-crypto/types';
import { KeyringPair, KeyringPair$Json, KeyringPair$Meta, KeyringPairType } from '../types';
import { PairInfo } from './types';

import { naclKeypairFromSeed as naclFromSeed, naclSign, naclVerify, schnorrkelKeypairFromSeed as schnorrkelFromSeed, schnorrkelSign, schnorrkelVerify } from '@polkadot/util-crypto/index';

import { encodeAddress } from '../address';
import decode from './decode';
import encode from './encode';
import toJson from './toJson';

const fromSeed = (type: KeyringPairType, seed: Uint8Array) =>
  type === 'sr25519'
    ? schnorrkelFromSeed(seed)
    : naclFromSeed(seed);

const sign = (type: KeyringPairType, message: Uint8Array, pair: Partial<KeypairType>) =>
  type === 'sr25519'
    ? schnorrkelSign(message, pair)
    : naclSign(message, pair);

const verify = (type: KeyringPairType, message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array) =>
  type === 'sr25519'
    ? schnorrkelVerify(message, signature, publicKey)
    : naclVerify(message, signature, publicKey);

/**
 * @name pair
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
export default function createPair (type: KeyringPairType, { publicKey, seed }: PairInfo, meta: KeyringPair$Meta = {}, encoded: Uint8Array | null = null): KeyringPair {
  let secretKey: Uint8Array | undefined;

  if (seed) {
    const pair = fromSeed(type, seed);

    publicKey = pair.publicKey;
    secretKey = pair.secretKey;
  }

  return {
    type,
    address: (): string =>
      encodeAddress(publicKey),
    decodePkcs8: (passphrase?: string, _encoded?: Uint8Array | null): void => {
      const decoded = decode(passphrase, _encoded || encoded);

      publicKey = decoded.publicKey;
      seed = decoded.seed;
      secretKey = fromSeed(type, seed).secretKey;
    },
    encodePkcs8: (passphrase?: string): Uint8Array =>
      encode({ publicKey, seed }, passphrase),
    getMeta: (): KeyringPair$Meta =>
      meta,
    isLocked: (): boolean =>
      (!secretKey || secretKey.length === 0),
    lock: (): void => {
      secretKey = new Uint8Array(0);
    },
    publicKey: (): Uint8Array =>
      publicKey,
    setMeta: (_meta: KeyringPair$Meta): void => {
      meta = meta;
    },
    sign: (message: Uint8Array): Uint8Array =>
      sign(type, message, { publicKey, secretKey }),
    toJson: (passphrase?: string): KeyringPair$Json =>
      toJson(type, { meta, publicKey }, encode({ publicKey, seed }, passphrase), !!passphrase),
    toType: (type: KeyringPairType): KeyringPair =>
      createPair(type, { publicKey, seed }, meta, null),
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      verify(type, message, signature, publicKey)
  };
}
