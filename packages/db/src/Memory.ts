// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import MemoryDb from './engines/MemoryDb';
import TransactionDb from './engines/TransactionDb';

export default class Memory extends TransactionDb {
  constructor () {
    super(new MemoryDb());
  }
}
