// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// For RLP, this is what it used to be, currently we only support Substrate
// encoding, i.e. using the Parity-defined codec for the Trie encoding
// import decode from '@polkadot/util-rlp/decode';
// import encode from '@polkadot/util-rlp/encode';

import decode from './decode';
import hashing from './hashing';

export { default as stream } from './stream';

type Codec = {
  decode: (input?: Uint8Array | null) => null | Array<null | Uint8Array>,
  hashing: (input: Uint8Array) => Uint8Array
};

const codec: Codec = {
  decode,
  hashing
};

export default codec;
