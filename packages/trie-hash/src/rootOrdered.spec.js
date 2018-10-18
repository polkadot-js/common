// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { hexToU8a, stringToU8a } from '@polkadot/util/index';

import { trieRootOrdered } from './index';

describe('trieRootOrdered', () => {
  // https://github.com/paritytech/parity/blob/e95b09348386d01b71901365785c5fa3aa2f7a6d/util/triehash/src/lib.rs#L42
  it('encodes a values', () => {
    expect(
      trieRootOrdered([
        stringToU8a('doe'),
        stringToU8a('reindeer')
      ])
    ).toEqual(
      hexToU8a(
        '0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3'
      )
    );
  });
});
