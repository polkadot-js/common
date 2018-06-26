// Copyright 2017-2018 @polkadot/storage authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { CreateItems, CreateItemOptions, Section } from '@polkadot/params/types';
import { Storages, Storage$Sections } from './types';

import param from '@polkadot/params/param';
import createSection from '@polkadot/params/section';

const approvalsOf: CreateItemOptions = {
  description: 'Approvals for a specific account',
  isDeprecated: true,
  key: 'gov:app:',
  params: [
    param('who', 'AccountId')
  ],
  type: 'Bytes'
};

const approvalsRatio: CreateItemOptions = {
  description: 'The apprivals ratio',
  isDeprecated: true,
  key: 'gov:apr',
  params: [],
  type: 'u32'
};

const currentProposal: CreateItemOptions = {
  description: 'The current proposal',
  isDeprecated: true,
  key: 'gov:pro',
  params: [],
  type: 'Bytes'
};

export default (name: Storage$Sections): Section<Storages> =>
  createSection(name)((createMethod: CreateItems<Storages>) => ({
    description: 'Governance (deprecated)',
    isDeprecated: true,
    public: {
      approvalsOf:
        createMethod('approvalsOf')(approvalsOf),
      approvalsRatio:
        createMethod('approvalsRatio')(approvalsRatio),
      currentProposal:
        createMethod('currentProposal')(currentProposal)
    }
  }));
