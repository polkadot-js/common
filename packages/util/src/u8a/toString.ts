// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

let decoder: TextDecoder | undefined;

try {
  decoder = new TextDecoder('utf-8');
} catch (error) {
  // ignore
}

/**
 * @name u8aToString
 * @signature u8aToString (value?: UInt8Array): string
 * @summary Creates a utf-8 string from a Uint8Array object.
 * @description
 * `UInt8Array` input values return the actual decoded utf-8 string. `null` or `undefined` values returns an empty string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToString } from '@polkadot/util';
 *
 * u8aToString(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f])); // hello
 * ```
 */
export default function u8aToString (value?: Uint8Array): string {
  if (!value || !value.length) {
    return '';
  } else if (decoder) {
    return decoder.decode(value);
  }

  return value.reduce((str, code) => {
    return str + String.fromCharCode(code);
  }, '');
}
