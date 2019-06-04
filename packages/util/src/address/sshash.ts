// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// This is not great - here we now have a dependency from util -> crypto
import { blake2AsU8a } from '@polkadot/util-crypto';

import stringToU8a from '../string/toU8a';
import u8aConcat from '../u8a/concat';

const SS58_PREFIX = stringToU8a('SS58PRE');

export default function hash (key: Uint8Array): Uint8Array {
  return blake2AsU8a(u8aConcat(SS58_PREFIX, key), 512);
}
