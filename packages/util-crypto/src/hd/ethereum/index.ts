// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { assert, bnToU8a, stringToU8a, u8aConcat } from '@polkadot/util';

import { secp256k1KeypairFromSeed, secp256k1PrivateKeyTweakAdd } from '../..';
import { hmacSha512 } from '../../hmac';
import { HARDENED, hdValidatePath } from '../validatePath';

const MASTER_SECRET = stringToU8a('Bitcoin seed');

export class HDKeyEth {
  chainCode: Uint8Array;
  publicKey: Uint8Array;
  secretKey: Uint8Array;

  constructor (secretKey: Uint8Array, chainCode: Uint8Array) {
    assert(secretKey.length === 32, 'Private key must be 32 bytes.');

    this.secretKey = secretKey;
    this.publicKey = secp256k1KeypairFromSeed(secretKey).publicKey;
    this.chainCode = chainCode;
  }

  // derive
  public derive (path: string): HDKeyEth {
    if (path === 'm' || path === 'M' || path === "m'" || path === "M'") {
      return this;
    }

    assert(hdValidatePath(path), 'Invalid derivation path');

    return path
      .split('/')
      .slice(1)
      .reduce((hd: HDKeyEth, c): HDKeyEth => hd.deriveChild(
        parseInt(c, 10) + (
          (c.length > 1) && c.endsWith("'")
            ? HARDENED
            : 0
        )
      ), this);
  }

  // deriveChild
  private deriveChild (index: number): HDKeyEth {
    assert(this.chainCode, 'Cannot derive without an existing chain code');
    assert(this.secretKey, 'Cannot derive without an existing private key');

    const indexBuffer = bnToU8a(index, { bitLength: 32, isLe: false });
    let data: Uint8Array;

    if (index >= HARDENED) {
      data = u8aConcat(new Uint8Array(1), this.secretKey, indexBuffer);
    } else {
      assert(this.publicKey, 'Could not derive hardened child key : no publicKey');

      data = u8aConcat(this.publicKey, indexBuffer);
    }

    // Private parent key -> private child key
    try {
      const I = hmacSha512(this.chainCode, data);

      return new HDKeyEth(
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
  const hdkey = new HDKeyEth(I.slice(0, 32), I.slice(32));
  const { publicKey, secretKey } = path
    ? hdkey.derive(path)
    : hdkey;

  return { publicKey, secretKey };
}
