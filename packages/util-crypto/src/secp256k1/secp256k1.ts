// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import EC from 'elliptic/lib/elliptic/ec';
// import { ec as EC } from 'elliptic';

const secp256k1 = new EC('secp256k1');

export default secp256k1;
