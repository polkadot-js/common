// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { assert, bnToU8a, stringToU8a, u8aConcat } from '@polkadot/util';

import { secp256k1KeypairFromSeed, secp256k1PrivateKeyTweakAdd } from '../..';
import { hmacSha512 } from '../../hmac';
import { HARDENED, hdValidatePath } from '../validatePath';

const MASTER_SECRET = stringToU8a('Bitcoin seed');

export class HDKeyEth {
  public chainCode: Uint8Array | null;

  #publicKey: Uint8Array | null;
  #secretKey: Uint8Array | null;

  constructor () {
    this.#secretKey = null;
    this.#publicKey = null;
    this.chainCode = null;
  }

  get publicKey (): Uint8Array | null {
    return this.#publicKey;
  }

  set secretKey (value: Uint8Array | null) {
    assert(value && value.length === 32, 'Private key must be 32 bytes.');

    this.#secretKey = value;

    if (value) {
      this.#publicKey = secp256k1KeypairFromSeed(value).publicKey;
    }
  }

  get secretKey (): Uint8Array | null {
    return this.#secretKey;
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
    const isHardened = index >= HARDENED;
    const indexBuffer = bnToU8a(index, { bitLength: 32, isLe: false });
    let data: Uint8Array;

    if (isHardened) { // Hardened child
      assert(this.secretKey, 'Could not derive hardened child key without private key');

      // data = 0x00 || ser256(kpar) || ser32(index)
      data = u8aConcat(new Uint8Array(1), this.secretKey, indexBuffer);
    } else { // Normal child
      // data = serP(point(kpar)) || ser32(index)
      //      = serP(Kpar) || ser32(index)
      assert(this.publicKey, 'Could not derive hardened child key : no publicKey');

      data = u8aConcat(this.publicKey, indexBuffer);
    }

    assert(this.chainCode, 'deriveChild error: no chainCode');
    assert(this.secretKey, 'PublicKey derivation without private key is not supported');

    const I = hmacSha512(this.chainCode, data);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    const hd = new HDKeyEth();

    // Private parent key -> private child key
    try {
      hd.secretKey = secp256k1PrivateKeyTweakAdd(this.secretKey, IL);
      // throw if IL >= n || (privateKey + IL) === 0
    } catch (err) {
      console.log('error when secp256k1PrivateKeyTweakAdd in eth key derivation', err);

      // In case parse256(IL) >= n or ki == 0, one should proceed with the next value for i
      return this.deriveChild(index + 1);
    }

    hd.chainCode = IR;

    return hd;
  }
}

export function hdEthereum (seed: Uint8Array, path = ''): Keypair {
  const hdkey = new HDKeyEth();
  const I = hmacSha512(MASTER_SECRET, seed);

  hdkey.secretKey = I.slice(0, 32);
  hdkey.chainCode = I.slice(32);

  const { publicKey, secretKey } = path
    ? hdkey.derive(path)
    : hdkey;

  assert(publicKey && secretKey, 'Unable to derive HD key from path');

  return { publicKey, secretKey };
}
