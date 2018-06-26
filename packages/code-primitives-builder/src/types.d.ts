// Copyright 2017-2018 @polkadot/primitives-builder authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockNumber, Hash, HeaderHash } from '@polkadot/primitives/base';
import { Digest$Log } from '@polkadot/primitives/digest';
import { UncheckedRaw } from '@polkadot/primitives/extrinsic';

export type HeaderIncomplete = {
  digest?: {
    logs?: Array<Digest$Log>
  },
  extrinsicsRoot?: Hash,
  parentHash?: HeaderHash,
  number?: BlockNumber | number,
  stateRoot?: Hash
};

export type BlockIncomplete = {
  header?: HeaderIncomplete,
  extrinsics?: Array<UncheckedRaw>
};
