// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import baseX from 'base-x';

// https://github.com/cryptocoinjs/base-x#alphabets
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const bs58 = baseX(BASE58_ALPHABET);

export {
  BASE58_ALPHABET,
  bs58
};
