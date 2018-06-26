// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Role } from './index';

import assert from '@polkadot/util/assert';
import isUndefined from '@polkadot/util/is/undefined';

import all from './all';

export default function roleFromId (roleId: number): Role {
  const role = [...all].find(([key, value]) => value === roleId);

  assert(!isUndefined(role), `Unable to find valid role for '${roleId}'`);

  // @ts-ignore we have something, checked by assert
  return role[0];
}
