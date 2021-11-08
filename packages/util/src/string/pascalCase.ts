// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import camelcase from 'camelcase';

/**
 * @name stringPascalCase
 * @summary Convert a dash/dot/underscore/space separated string/String to PascalCase
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function stringPascalCase (value: string | String): string {
  return camelcase(value.toString(), { pascalCase: true });
}
