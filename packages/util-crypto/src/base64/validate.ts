// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
