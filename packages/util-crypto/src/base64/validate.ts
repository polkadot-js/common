// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from "@polkadot/util";

/**
 * @name base64Validate
 * @summary Validates a base64 value.
 * @description
 * Validates the the supplied value is valid base64
 */
export default function base64Validate (value?: string | null): true {
  assert(value, 'Empty base64 input');

  if (!(/^(?:[A-Za-z0-9+/]{2}[A-Za-z0-9+/]{2})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value))) {
    throw new TypeError('Invalid base64 encoding');
  }

  return true;
}
