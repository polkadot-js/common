// Copyright 2017-2018 @polkadot/storage authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { CreateItems, CreateItemOptions, Section } from '@polkadot/params/types';
import { Storages, Storage$Sections } from './types';

import param from '@polkadot/params/param';
import createSection from '@polkadot/params/section';

const currentIndex: CreateItemOptions = {
  description: 'Current index of the session',
  key: 'ses:ind',
  params: [],
  type: 'BlockNumber'
};

const lastSessionChange: CreateItemOptions = {
  description: 'Block at which the session length last changed',
  key: 'ses:llc',
  params: [],
  type: 'BlockNumber'
};

const nextKeyFor: CreateItemOptions = {
  description: 'The next key for a given validator',
  key: 'ses:nxt:',
  params: [
    param('who', 'AccountId')
  ],
  type: 'SessionKey'
};

const nextLength: CreateItemOptions = {
  description: 'The next session length',
  key: 'ses:nln',
  params: [],
  type: 'BlockNumber'
};

const length: CreateItemOptions = {
  description: 'Current length of the session',
  key: 'ses:len',
  params: [],
  type: 'BlockNumber'
};

const validators: CreateItemOptions = {
  description: 'Current validators',
  key: 'ses:val',
  params: [],
  type: ['AccountId']
};

export default (name: Storage$Sections): Section<Storages> =>
  createSection(name)((createMethod: CreateItems<Storages>) => ({
    description: 'Session management information',
    public: {
      currentIndex:
        createMethod('currentIndex')(currentIndex),
      lastSessionChange:
        createMethod('lastSessionChange')(lastSessionChange),
      nextKeyFor:
        createMethod('nextKeyFor')(nextKeyFor),
      nextLength:
        createMethod('nextLength')(nextLength),
      length:
        createMethod('length')(length),
      validators:
        createMethod('validators')(validators)
    }
  }));
