// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { DecodeFunc, DecodeOutput } from './types';

export default function decodeSingle (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  return {
    decoded: input.slice(0, 1),
    remainder: input.slice(1)
  };
}
