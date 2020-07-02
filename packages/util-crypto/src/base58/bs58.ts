// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import baseX from 'base-x';

// https://github.com/cryptocoinjs/base-x#alphabets
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const bs58 = baseX(BASE58_ALPHABET);

export {
  BASE58_ALPHABET,
  bs58
};
