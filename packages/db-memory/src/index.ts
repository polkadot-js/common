// Copyright 2017-2018 @polkadot/db-memory authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import Memory from './Memory';
import Overlay from './Overlay';

export default class MemoryDb extends Overlay {
  constructor () {
    super(new Memory());
  }
}
