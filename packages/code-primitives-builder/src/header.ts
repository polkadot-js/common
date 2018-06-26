// Copyright 2017-2018 @polkadot/primitives-builder authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Header } from '@polkadot/primitives/header';
import { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import { HeaderIncomplete } from './types';

import bnToBn from '@polkadot/util/bn/toBn';

import extrinsicsRawRoot from './extrinsic/rootRaw';

export default function header ({ digest: { logs = [] } = {}, extrinsicsRoot, number, parentHash = new Uint8Array(32), stateRoot = new Uint8Array(32) }: HeaderIncomplete, extrinsics?: Array<UncheckedRaw>): Header {
  return {
    digest: {
      logs
    },
    extrinsicsRoot: extrinsics
      ? extrinsicsRawRoot(extrinsics)
      : (extrinsicsRoot || extrinsicsRawRoot([])),
    number: bnToBn(number || 0),
    parentHash,
    stateRoot
  };
}
