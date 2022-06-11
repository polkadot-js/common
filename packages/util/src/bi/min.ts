// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createCmp } from './helpers';

/** @internal */
function gt (a: bigint, b: bigint): boolean {
  return a > b;
}

/** @internal */
function lt (a: bigint, b: bigint): boolean {
  return a < b;
}

/**
 * @name nMax
 * @summary Finds and returns the highest value in an array of bigint.
 */
export const nMax = createCmp(gt);

/**
 * @name nMin
 * @summary Finds and returns the lowest value in an array of bigint.
 */
export const nMin = createCmp(lt);
