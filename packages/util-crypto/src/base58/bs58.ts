// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import baseX from 'base-x';

// https://github.com/cryptocoinjs/base-x#alphabets
export const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export const bs58 = baseX(BASE58_ALPHABET);
