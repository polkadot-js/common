// Copyright 2017-2018 @polkadot/db-disk authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import Overlay from '@polkadot/db-memory/Overlay';

import RocksDb from './RocksDb';

export default class DiskDb extends Overlay {
  constructor (location: string) {
    super(new RocksDb(location));
  }
}
