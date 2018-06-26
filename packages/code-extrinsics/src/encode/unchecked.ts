// Copyright 2017-2018 @polkadot/extrinsics-codec authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { Extrinsics } from '@polkadot/extrinsics/types';
import { EncodingVersions, SectionItem } from '@polkadot/params/types';
import { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import { KeyringPair } from '@polkadot/util-keyring/types';

import u8aConcat from '@polkadot/util/u8a/concat';

import encode from './index';
import prefixes from './prefixes';

type Encoder = (extrinsic: SectionItem<Extrinsics>, values: Array<any>) => UncheckedRaw;

export default function unchecked (pair: KeyringPair, index: number | BN, version: EncodingVersions = 'latest'): Encoder {
  const encoder = encode(pair.publicKey(), index);

  return (extrinsic: SectionItem<Extrinsics>, values: Array<any>): UncheckedRaw => {
    const message = encoder(extrinsic, values, version);
    const signature = pair.sign(message);

    return u8aConcat(
      version === 'poc-1'
        ? prefixes.none
        : prefixes.publicKey,
      message,
      signature
    );
  };
}
