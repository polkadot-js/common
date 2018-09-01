// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import LevelDb from './engines/LevelDb';
import LruDb from './engines/LruDb';
import TransactionDb from './engines/TransactionDb';

export default class DiskDb extends TransactionDb {
  constructor (location: string) {
    super(
      new LruDb(
        new LevelDb(location)
      )
    );
  }
}
