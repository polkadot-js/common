// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Temp$Storage } from './types';

export default function del (storage: Temp$Storage, k: Uint8Array): void {
  // @ts-ignore yes, U8a index
  delete storage[k];
}
