// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LevelUp$AbstractStorage } from 'levelup';
import type { TrieDbState } from './types';

const l = require('@polkadot/util/logger')('triedb');

const createTemp = require('./temp');

module.exports = function state (db: LevelUp$AbstractStorage): TrieDbState {
  const storage = createTemp();

  return {
    db,
    l,
    storage
  };
};
