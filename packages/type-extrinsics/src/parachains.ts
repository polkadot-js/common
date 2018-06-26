// Copyright 2017-2018 @polkadot/extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { CreateItems, CreateItemOptions, Section } from '@polkadot/params/types';
import { Extrinsics, Extrinsic$Sections } from './types';

import param from '@polkadot/params/param';
import createSection from '@polkadot/params/section';

const setHeads: CreateItemOptions = {
  description: 'Sets parachain heads',
  isHidden: true, // inherent
  params: [
    param('heads', ['CandidateReceipt'])
  ],
  type: []
};

export default (name: Extrinsic$Sections, index: number): Section<Extrinsics> =>
  createSection(name, index)((createMethod: CreateItems<Extrinsics>) => ({
    description: 'Parchains',
    public: {
      setHeads:
        createMethod('setHeads', 0)(setHeads)
    },
    private: {}
  }));
