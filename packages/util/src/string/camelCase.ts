// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types';

import camelcase from 'camelcase';

/**
 * @name stringCamelCase
 * @summary Convert a dash/dot/underscore/space separated string/String to camelCase
 */
export function stringCamelCase (value: AnyString): string {
  return camelcase(value.toString());
}
