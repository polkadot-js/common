// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair$Meta } from '../types';
import { PairState } from './types';

export default function getMeta (state: PairState): KeyringPair$Meta {
  return state.meta;
}
