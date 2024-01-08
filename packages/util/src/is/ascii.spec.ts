// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringToU8a } from '../string/index.js';
import { perf } from '../test/index.js';
import { isAscii } from './index.js';

describe('isAscii', (): void => {
  it('returns true for an ASCII string', (): void => {
    expect(isAscii('Hello World! Testing')).toEqual(true);
  });

  it('returns false for an ASCII string (with formatters)', (): void => {
    expect(isAscii('Hello\tWorld!\n\rTesting')).toEqual(false);
  });

  it('returns false on an non-ascii string', (): void => {
    expect(isAscii('你好，世界')).toEqual(false);
  });

  it('returns true for ASCII bytes', (): void => {
    expect(isAscii(stringToU8a('Hello World! Testing'))).toEqual(true);
  });

  it('returns true for empty string inputs', (): void => {
    expect(isAscii('')).toEqual(true);
  });

  it('returns true for empty U8a inputs', (): void => {
    expect(isAscii(new Uint8Array())).toEqual(true);
  });

  it('returns false for empty undefined inputs', (): void => {
    expect(isAscii()).toEqual(false);
  });

  it('returns false for non-printable characters', (): void => {
    expect(isAscii(new Uint8Array([5]))).toEqual(false);
  });

  it('returns false for hex input, non-ascii', (): void => {
    expect(isAscii('0x010203')).toEqual(false);
  });

  perf('isAscii (str)', 2_000_000, [['Hello World! Testing']], isAscii);
  perf('isAscii (u8a)', 200_000, [[[stringToU8a('Hello World! Testing')]]], isAscii);
});
