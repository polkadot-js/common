// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { assert, bnToU8a, stringToU8a, u8aConcat } from '@polkadot/util';

import { hmacSha512 } from '../../hmac';
import { secp256k1KeypairFromSeed, secp256k1PrivateKeyTweakAdd } from '../../secp256k1';
import { HARDENED, hdValidatePath } from '../validatePath';

const MASTER_SECRET = stringToU8a('Bitcoin seed');

export class HDKey {
  readonly chainCode: Uint8Array;
  readonly publicKey: Uint8Array;
  readonly secretKey: Uint8Array;

  constructor (secretKey: Uint8Array, chainCode: Uint8Array) {
    this.secretKey = secretKey;
    this.publicKey = secp256k1KeypairFromSeed(secretKey).publicKey;
    this.chainCode = chainCode;
  }

  // derive
  public derive (path: string): HDKey {
    if (path === 'm' || path === 'M' || path === "m'" || path === "M'") {
      return this;
    }

    assert(hdValidatePath(path), 'Invalid derivation path');

    return path
      .split('/')
      .slice(1)
      .reduce((hd: HDKey, c): HDKey => hd.deriveChild(
        parseInt(c, 10) + (
          (c.length > 1) && c.endsWith("'")
            ? HARDENED
            : 0
        )
      ), this);
  }

  // deriveChild
  private deriveChild (index: number): HDKey {
    const indexBuffer = bnToU8a(index, { bitLength: 32, isLe: false });
    const data = index >= HARDENED
      ? u8aConcat(new Uint8Array(1), this.secretKey, indexBuffer)
      : u8aConcat(this.publicKey, indexBuffer);

    // Private parent key -> private child key
    try {
      const I = hmacSha512(this.chainCode, data);

      return new HDKey(
        secp256k1PrivateKeyTweakAdd(this.secretKey, I.slice(0, 32)),
        I.slice(32)
      );
    } catch (err) {
      console.log('error when secp256k1PrivateKeyTweakAdd in eth key derivation', err);

      // In case parse256(IL) >= n or ki == 0, one should proceed with the next value for i
      return this.deriveChild(index + 1);
    }
  }
}

export function hdEthereum (seed: Uint8Array, path = ''): Keypair {
  const I = hmacSha512(MASTER_SECRET, seed);
  const hdkey = new HDKey(I.slice(0, 32), I.slice(32));
  const { publicKey, secretKey } = path
    ? hdkey.derive(path)
    : hdkey;

  return { publicKey, secretKey };
}
