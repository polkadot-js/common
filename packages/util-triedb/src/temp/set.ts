// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Temp$Storage } from './types';

export default function set (storage: Temp$Storage, k: Uint8Array, v: Uint8Array): void {
  // @ts-ignore we coax into string here, bad I know
  storage[k] = {
    k: k.slice(),
    v: v.slice()
  };
}
