// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Prefix } from './types';

export default {
  allowedInputLengths: [1, 3, 5, 9, 32],
  // publicKey has prefix + 2 checksum bytes, short only prefix + 1 checksum byte
  allowedOutputLengths: [3, 5, 7, 11, 35],
  prefix: 42 as Prefix
};
