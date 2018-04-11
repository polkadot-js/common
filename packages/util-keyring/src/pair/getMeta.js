// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PairState, PairState$Meta } from './types';

module.exports = function getMeta (state: PairState): PairState$Meta {
  return state.meta;
};
