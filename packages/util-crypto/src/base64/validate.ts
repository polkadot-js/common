// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name base64Validate
 * @summary Validates a base64 value.
 * @description
 * Validates the the supplied value is valid base64
 */
export default function base64Validate (value: string): true {
  if (!(/^(?:[A-Za-z0-9+/]{2}[A-Za-z0-9+/]{2})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value))) {
    throw new TypeError('Invalid base64 encoding');
  }

  return true;
}
