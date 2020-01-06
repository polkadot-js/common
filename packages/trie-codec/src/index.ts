// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from './types';

import decode from './decode';
import encode from './encode';
import hashing from './hashing';

export { default as stream } from './stream';

const codec: Codec = {
  decode,
  encode,
  hashing,
  type: 'Substrate'
};

export default codec;
