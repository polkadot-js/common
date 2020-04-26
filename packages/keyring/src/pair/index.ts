// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair, KeypairType } from '@polkadot/util-crypto/types';
import { KeyringPair, KeyringPair$Json, KeyringPair$Meta, SignOptions } from '../types';
import { PairInfo } from './types';

import { assert, u8aConcat } from '@polkadot/util';
import { keyExtractPath, keyFromPath, naclKeypairFromSeed as naclFromSeed, naclSign, naclVerify, schnorrkelKeypairFromSeed as schnorrkelFromSeed, schnorrkelSign, schnorrkelVerify, secp256k1KeypairFromSeed as secp256k1FromSeed, secp256k1Sign, secp256k1Verify, blake2AsU8a } from '@polkadot/util-crypto';

import decode from './decode';
import encode from './encode';
import toJson from './toJson';

interface Setup {
  toSS58: (publicKey: Uint8Array) => string;
  type: KeypairType;
}

const SIG_TYPE_NONE = new Uint8Array();
const SIG_TYPE_ED25519 = new Uint8Array([0]);
const SIG_TYPE_SR25519 = new Uint8Array([1]);
const SIG_TYPE_ECDSA = new Uint8Array([2]);

function isEmpty (u8a: Uint8Array): boolean {
  return u8a.reduce((count, u8): number => count + u8, 0) === 0;
}

function fromSeed (type: KeypairType, seed: Uint8Array): Keypair {
  return {
    ecdsa: (): Keypair => secp256k1FromSeed(seed),
    ed25519: (): Keypair => naclFromSeed(seed),
    sr25519: (): Keypair => schnorrkelFromSeed(seed)
  }[type]();
}

function multiSignaturePrefix (type: KeypairType): Uint8Array {
  return {
    ecdsa: SIG_TYPE_ECDSA,
    ed25519: SIG_TYPE_ED25519,
    sr25519: SIG_TYPE_SR25519
  }[type];
}

function sign (type: KeypairType, message: Uint8Array, pair: Partial<Keypair>, { withType = false }: SignOptions = {}): Uint8Array {
  const signature = {
    ecdsa: (): Uint8Array => secp256k1Sign(message, pair),
    ed25519: (): Uint8Array => naclSign(message, pair),
    sr25519: (): Uint8Array => schnorrkelSign(message, pair)
  }[type]();

  return u8aConcat(
    // for multi-signatures, i.e. with indicator, append the signature type as per
    // the MultiSignature enum
    withType
      ? multiSignaturePrefix(type)
      : SIG_TYPE_NONE,
    signature
  );
}

function verify (type: KeypairType, message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean {
  return {
    ecdsa: (): boolean => secp256k1Verify(message, signature, blake2AsU8a(publicKey, 256)),
    ed25519: (): boolean => naclVerify(message, signature, publicKey),
    sr25519: (): boolean => schnorrkelVerify(message, signature, publicKey)
  }[type]();
}

function getAddress (type: KeypairType, publicKey: Uint8Array): Uint8Array {
  if (type === 'ecdsa' && publicKey.length > 32) {
    return blake2AsU8a(publicKey, 256);
  } else {
    return publicKey;
  }
}

// Not 100% correct, since it can be a Uint8Array, but an invalid one - just say "undefined" is anything non-valid
function isLocked (secretKey?: Uint8Array): secretKey is undefined {
  return !secretKey || secretKey.length === 0 || isEmpty(secretKey);
}

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
 * - `meta` is the metadata that is stored in the state of the pair, either when it was originally
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
export default function createPair ({ toSS58, type }: Setup, { publicKey, secretKey }: PairInfo, meta: KeyringPair$Meta = {}, encoded: Uint8Array | null = null): KeyringPair {
  return {
    get address (): string {
      return toSS58(getAddress(type, publicKey));
    },
    get isLocked (): boolean {
      return isLocked(secretKey);
    },
    get meta (): KeyringPair$Meta {
      return meta;
    },
    get publicKey (): Uint8Array {
      return publicKey;
    },
    get type (): KeypairType {
      return type;
    },
    // eslint-disable-next-line sort-keys
    decodePkcs8: (passphrase?: string, _encoded?: Uint8Array | null): void => {
      const decoded = decode(passphrase, _encoded || encoded);

      if (decoded.secretKey.length === 64) {
        publicKey = decoded.publicKey;
        secretKey = decoded.secretKey;
      } else {
        const pair = fromSeed(type, decoded.secretKey);

        publicKey = pair.publicKey;
        secretKey = pair.secretKey;
      }
    },
    derive: (suri: string, meta?: KeyringPair$Meta): KeyringPair => {
      assert(!isLocked(secretKey), 'Cannot derive on a locked keypair');

      const { path } = keyExtractPath(suri);
      const derived = keyFromPath({ publicKey, secretKey }, path, type);

      return createPair({ toSS58, type }, derived, meta, null);
    },
    encodePkcs8: (passphrase?: string): Uint8Array =>
      encode({ publicKey, secretKey }, passphrase),
    lock: (): void => {
      secretKey = new Uint8Array(0);
    },
    setMeta: (additional: KeyringPair$Meta): void => {
      meta = { ...meta, ...additional };
    },
    sign: (message: Uint8Array, options?: SignOptions): Uint8Array => {
      assert(!isLocked(secretKey), 'Cannot sign with a locked key pair');

      return sign(type, message, { publicKey, secretKey }, options);
    },
    toJson: (passphrase?: string): KeyringPair$Json =>
      toJson(type, { address: toSS58(getAddress(type, publicKey)), meta }, encode({ publicKey, secretKey }, passphrase), !!passphrase),
    verify: (message: Uint8Array, signature: Uint8Array): boolean =>
      verify(type, message, signature, publicKey)
  };
}
