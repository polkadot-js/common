// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Role } from './index';

const all: Map<Role, number> = new Map([
  ['none' as Role, 0b00000000],
  ['full' as Role, 0b00000001],
  ['light' as Role, 0b00000010],
  ['collator' as Role, 0b00000100],
  ['validator' as Role, 0b00001000]
]);

export default all;
