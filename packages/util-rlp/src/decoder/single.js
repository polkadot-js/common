// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DecodeFunc, DecodeOutput } from './types';

module.exports = function decodeSingle (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  return {
    decoded: input.slice(0, 1),
    remainder: input.slice(1)
  };
};
