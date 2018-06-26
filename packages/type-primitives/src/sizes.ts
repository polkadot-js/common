// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export type SizeType = 32 | 64 | 128;

const Balance: SizeType = 128;
const BlockNumber: SizeType = 64;
const Index: SizeType = 32;

export default {
  Balance,
  BlockNumber,
  Index
};
