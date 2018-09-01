// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import FileFlatDb from './engines/FileFlatDb';
import LruDb from './engines/LruDb';
// import RocksDb from './engines/RocksDb';
import TransactionDb from './engines/TransactionDb';

export default class DiskDb extends TransactionDb {
  constructor (location: string) {
    super(
      new LruDb(
        new FileFlatDb(location)
      )
    );
  }
}
