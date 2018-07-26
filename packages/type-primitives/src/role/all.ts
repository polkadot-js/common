// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RoleMap } from './index';

const all: RoleMap = {
  none: 0b00000000,
  full: 0b00000001,
  light: 0b00000010,
  collator: 0b00000100,
  validator: 0b00001000
};

export default all;
