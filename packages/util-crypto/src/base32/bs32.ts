// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { utils } from 'micro-base';

export const BASE32_ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567';

// We define our own chain, the default base32 has padding
export const base32 = utils.chain(
  utils.radix2(5),
  utils.alphabet(BASE32_ALPHABET),
  {
    decode: (input: string) => input.split(''),
    encode: (input: string[]) => input.join('')
  }
);
