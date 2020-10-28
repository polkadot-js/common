// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import camelcase from 'camelcase';

/**
 * @name stringCamelCase
 * @summary Convert a dash/dot/underscore/space separated string/String to camelCase
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function stringCamelCase (value: string | String): string {
  return camelcase(value.toString());
}
