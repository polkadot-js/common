// Copyright 2017-2018 @polkadot/storage authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { CreateItems, CreateItemOptions, Section } from '@polkadot/params/types';
import { Storages, Storage$Sections } from './types';

import createSection from '@polkadot/params/section';

const current: CreateItemOptions = {
  description: 'The current timestamp',
  key: 'tim:val',
  params: [],
  type: 'Timestamp'
};

const didUpdate: CreateItemOptions = {
  description: 'Did the timestamp update',
  key: 'tim:did',
  params: [],
  type: 'bool'
};

export default (name: Storage$Sections): Section<Storages> =>
  createSection(name)((createMethod: CreateItems<Storages>) => ({
    description: 'Timestamp related entries',
    public: {
      current:
        createMethod('current')(current),
      didUpdate:
        createMethod('didUpdate')(didUpdate)
    }
  }));
