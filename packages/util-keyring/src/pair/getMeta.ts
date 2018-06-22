// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringPair$Meta } from '../types';
import { PairState } from './types';

export default function getMeta (state: PairState): KeyringPair$Meta {
  return state.meta;
}
