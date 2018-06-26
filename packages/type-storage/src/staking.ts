// Copyright 2017-2018 @polkadot/storage authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { CreateItems, CreateItemOptions, Section } from '@polkadot/params/types';
import { Storages, Storage$Sections } from './types';

import param from '@polkadot/params/param';
import createSection from '@polkadot/params/section';

const freeBalanceOf: CreateItemOptions = {
  description: 'The balance of a given account',
  key: 'sta:bal:',
  params: [
    param('who', 'AccountId')
  ],
  type: 'Balance'
};

const bondageOf: CreateItemOptions = {
  key: 'sta:bon:',
  description: 'The block at which the account becomes liquid',
  params: [
    param('who', 'AccountId')
  ],
  type: 'Balance'
};

const codeOf: CreateItemOptions = {
  key: 'sta:cod:',
  description: 'The code associated with an account',
  params: [
    param('who', 'AccountId')
  ],
  type: 'Bytes'
};

const transactionFee: CreateItemOptions = {
  description: 'The fee to be paid for making a transaction',
  key: 'sta:fee',
  params: [],
  type: 'Balance'
};

const bondingDuration: CreateItemOptions = {
  description: 'The length of the bonding duration in eras',
  key: 'sta:loc',
  params: [],
  type: 'BlockNumber'
};

const currentEra: CreateItemOptions = {
  description: 'The current era index',
  key: 'sta:era',
  params: [],
  type: 'BlockNumber'
};

const reservedBalanceOf: CreateItemOptions = {
  description: 'The amount of a given account that is reserved',
  key: 'sta:lbo:',
  params: [
    param('who', 'AccountId')
  ],
  type: 'Balance'
};

const intentions: CreateItemOptions = {
  description: 'All the accounts with a desire to stake',
  key: 'sta:wil:',
  params: [],
  type: ['AccountId']
};

const lastEraLengthChange: CreateItemOptions = {
  description: 'The block number at which the era length last changed',
  key: 'sta:lec',
  params: [],
  type: 'BlockNumber'
};

const nextSessionsPerEra: CreateItemOptions = {
  description: 'The next value of sessions per era',
  key: 'sta:nse',
  params: [],
  type: 'BlockNumber'
};

const sessionsPerEra: CreateItemOptions = {
  description: 'The length of a staking era in sessions',
  key: 'sta:spe',
  params: [],
  type: 'BlockNumber'
};

const storageOf: CreateItemOptions = {
  description: 'The storage items associated with an account/key',
  key: 'sta:sto:',
  params: [
    param('who', 'AccountId')
  ],
  type: 'Bytes'
};

const totalStake: CreateItemOptions = {
  description: 'The total amount of stake on the system',
  key: 'sta:tot',
  params: [],
  type: 'Balance'
};

const validatorCount: CreateItemOptions = {
  description: 'The number of validators',
  key: 'sta:vac',
  params: [],
  type: 'u32'
};

export default (name: Storage$Sections): Section<Storages> =>
  createSection(name)((createMethod: CreateItems<Storages>) => ({
    description: 'Staking',
    public: {
      freeBalanceOf:
        createMethod('freeBalanceOf')(freeBalanceOf),
      bondageOf:
        createMethod('bondageOf')(bondageOf),
      codeOf:
        createMethod('codeOf')(codeOf),
      transactionFee:
        createMethod('transactionFee')(transactionFee),
      bondingDuration:
        createMethod('bondingDuration')(bondingDuration),
      currentEra:
        createMethod('currentEra')(currentEra),
      reservedBalanceOf:
        createMethod('reservedBalanceOf')(reservedBalanceOf),
      intentions:
        createMethod('intentions')(intentions),
      lastEraLengthChange:
        createMethod('lastEraLengthChange')(lastEraLengthChange),
      nextSessionsPerEra:
        createMethod('nextSessionsPerEra')(nextSessionsPerEra),
      sessionsPerEra:
        createMethod('sessionsPerEra')(sessionsPerEra),
      storageOf:
        createMethod('storageOf')(storageOf),
      totalStake:
        createMethod('totalStake')(totalStake),
      validatorCount:
        createMethod('validatorCount')(validatorCount)
    }
  }));
