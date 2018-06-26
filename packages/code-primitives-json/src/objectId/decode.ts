// Copyright 2017-2018 @polkadot/primitives-json authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ObjectId } from '@polkadot/primitives/base';
import { JsonObjectId } from '../types';

import bnDecode from '../bn/decode';

export default function objectIdDecode (value: JsonObjectId): ObjectId {
  return bnDecode(value, 64);
}
