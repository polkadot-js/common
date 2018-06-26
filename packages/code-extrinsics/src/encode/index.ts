// Copyright 2017-2018 @polkadot/extrinsics-codec authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { Extrinsics } from '@polkadot/extrinsics/types';
import { EncodingVersions, SectionItem } from '@polkadot/params/types';
import { ExtrinsicWithAccount } from '../types';

import encodeCall from './call';
import encodeExtrinsic from './extrinsic';

type Encoder = (extrinsic: SectionItem<Extrinsics>, values: Array<any>, version: EncodingVersions) => ExtrinsicWithAccount;

export default function encode (publicKey: Uint8Array, index: number | BN): Encoder {
  return (extrinsic: SectionItem<Extrinsics>, values: Array<any>, version: EncodingVersions): ExtrinsicWithAccount =>
    encodeCall(
      publicKey,
      index,
      encodeExtrinsic(extrinsic, values, version),
      version
    );
}
