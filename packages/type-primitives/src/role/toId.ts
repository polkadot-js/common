// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Role } from './index';

import assert from '@polkadot/util/assert';
import isUndefined from '@polkadot/util/is/undefined';

import all from './all';

export default function roleToId (role: Role): number {
  const roleId = all.get(role);

  assert(!isUndefined(roleId), `Unable to perform mapping from role '${role}'`);

  // @ts-ignore assert catches above
  return roleId;
}
