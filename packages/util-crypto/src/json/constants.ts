// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EncryptedJsonEncoding } from './types';

export const ENCODING: EncryptedJsonEncoding[] = ['scrypt', 'xsalsa20-poly1305'];
export const NONCE_LENGTH = 24;
export const SCRYPT_LENGTH = 32 + (3 * 4);
