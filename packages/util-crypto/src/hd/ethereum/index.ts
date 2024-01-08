// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types.js';

import { bnToU8a, stringToU8a, u8aConcat } from '@polkadot/util';

import { BN_BE_32_OPTS } from '../../bn.js';
import { hmacShaAsU8a } from '../../hmac/index.js';
import { secp256k1PairFromSeed, secp256k1PrivateKeyTweakAdd } from '../../secp256k1/index.js';
import { HARDENED, hdValidatePath } from '../validatePath.js';

interface CodedKeypair extends Keypair {
  chainCode: Uint8Array;
}

const MASTER_SECRET = stringToU8a('Bitcoin seed');

function createCoded (secretKey: Uint8Array, chainCode: Uint8Array): CodedKeypair {
  return {
    chainCode,
    publicKey: secp256k1PairFromSeed(secretKey).publicKey,
    secretKey
  };
}

function deriveChild (hd: CodedKeypair, index: number): CodedKeypair {
  const indexBuffer = bnToU8a(index, BN_BE_32_OPTS);
  const data = index >= HARDENED
    ? u8aConcat(new Uint8Array(1), hd.secretKey, indexBuffer)
    : u8aConcat(hd.publicKey, indexBuffer);

  try {
    const I = hmacShaAsU8a(hd.chainCode, data, 512);

    return createCoded(
      secp256k1PrivateKeyTweakAdd(hd.secretKey, I.slice(0, 32)),
      I.slice(32)
    );
  } catch {
    // In case parse256(IL) >= n or ki == 0, proceed with the next value for i
    return deriveChild(hd, index + 1);
  }
}

export function hdEthereum (seed: Uint8Array, path = ''): Keypair {
  const I = hmacShaAsU8a(MASTER_SECRET, seed, 512);
  let hd = createCoded(I.slice(0, 32), I.slice(32));

  if (!path || path === 'm' || path === 'M' || path === "m'" || path === "M'") {
    return hd;
  }

  if (!hdValidatePath(path)) {
    throw new Error('Invalid derivation path');
  }

  const parts = path.split('/').slice(1);

  for (const p of parts) {
    hd = deriveChild(hd, parseInt(p, 10) + (
      (p.length > 1) && p.endsWith("'")
        ? HARDENED
        : 0
    ));
  }

  return hd;
}
