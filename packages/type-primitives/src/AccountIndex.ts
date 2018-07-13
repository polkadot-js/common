// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { AccountIndex, AccountIndexDecoder } from './types';

import BN from 'bn.js';
import bnToBn from '@polkadot/util/bn/toBn';

class AccountIndexImpl implements AccountIndex {
  value: BN;

  constructor (value: BN | number) {
    this.value = bnToBn(value);
  }

  encode (): Uint8Array {
    return new Uint8Array();
  }

  toJSON (): any {
    return {};
  }

  static decode (input: Uint8Array): AccountIndexImpl {
    return new AccountIndexImpl(0);
  }

  static fromJSON (input: any): AccountIndexImpl {
    return new AccountIndexImpl(0);
  }
}

export default (AccountIndexImpl as AccountIndexDecoder);
