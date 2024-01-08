// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { mnemonicToLegacySeed } from '@polkadot/util-crypto';

import { hdEthereum } from './index.js';

describe('hdEthereum', (): void => {
  const PHRASE = 'seed sock milk update focus rotate barely fade car face mechanic mercy';
  const derivationPath = 'm/44\'/60\'/0\'/0/0';
  const PUBLIC = new Uint8Array([
    3, 118, 64, 77, 247, 27, 4, 157,
    236, 206, 251, 221, 230, 244, 154, 147,
    189, 131, 249, 169, 102, 78, 3, 185,
    153, 19, 89, 40, 24, 25, 139, 131,
    93
  ]);
  const SECRET = new Uint8Array([
    166, 162, 203, 17, 2, 206, 110, 176,
    18, 102, 230, 144, 90, 158, 25, 232,
    43, 180, 176, 49, 189, 149, 3, 71,
    243, 228, 223, 104, 125, 132, 58, 228
  ]
  );
  const PUBLICDERIVED = new Uint8Array([
    3, 129, 53, 27, 27, 70, 210, 96,
    43, 9, 146, 187, 93, 85, 49, 249,
    193, 105, 107, 8, 18, 254, 178, 83,
    75, 104, 132, 173, 196, 126, 46, 29,
    139
  ]);
  const SECRETDERIVED = new Uint8Array([
    7, 13, 195, 17, 115, 0, 1, 25,
    24, 226, 107, 2, 23, 105, 69, 204,
    21, 195, 213, 72, 207, 73, 253, 132,
    24, 217, 127, 147, 175, 105, 158, 70
  ]);

  it('derives the right key pair from a mnemonic', (): void => {
    const key = hdEthereum(mnemonicToLegacySeed(PHRASE, '', false, 64));

    expect(key.publicKey).toEqual(PUBLIC);
    expect(key.secretKey).toEqual(SECRET);
  });

  it('derives the right key pair from a mnemonic and a derivation path', (): void => {
    const key = hdEthereum(mnemonicToLegacySeed(PHRASE, '', false, 64), derivationPath);

    expect(key.publicKey).toEqual(PUBLICDERIVED);
    expect(key.secretKey).toEqual(SECRETDERIVED);
  });
});
