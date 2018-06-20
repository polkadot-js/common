// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LevelUp$AbstractStorage } from 'levelup';
import type { TrieDbState } from './types';

import logger from '@polkadot/util/logger';

import createTemp from './temp';

export default function state (db: LevelUp$AbstractStorage): TrieDbState {
  const storage = createTemp();

  return {
    db,
    l: logger('triedb'),
    storage
  };
}
