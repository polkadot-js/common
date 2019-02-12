// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '@polkadot/util-crypto/types';
import { KeyringPair$Meta } from '../types';

export type PairState = {
  meta: KeyringPair$Meta,
  publicKey: Uint8Array
};

export type PairInfo = KeypairType & {
  seed: Uint8Array
};
