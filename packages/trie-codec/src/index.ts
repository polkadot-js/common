// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import rlp from './rlp';

type Codec = {
  decode: (input?: Uint8Array) => Uint8Array | Array<any>,
  encode: (input: any) => Uint8Array
};

const codec: Codec = rlp;

export default codec;
