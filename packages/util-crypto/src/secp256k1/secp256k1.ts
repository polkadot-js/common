// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import elliptic from 'elliptic';

// eslint-disable-next-line new-cap
export const secp256k1 = new elliptic.ec('secp256k1');
