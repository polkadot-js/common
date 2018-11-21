// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export type Codec = {
  decode: (input: null | Uint8Array) => Uint8Array | null | Array<null | Uint8Array | Array<null | Uint8Array>>,
  encode: (input?: null | Uint8Array | Array<null | Uint8Array>) => Uint8Array
  hashing: (input: Uint8Array) => Uint8Array,
  type: string
};
