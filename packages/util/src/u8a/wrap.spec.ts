// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

// Originally from https://github.com/polkadot-js/extension/pull/743

import { u8aConcat, u8aEq, u8aToString } from '@polkadot/util';

import { U8A_WRAP_ETHEREUM, U8A_WRAP_POSTFIX, U8A_WRAP_PREFIX, u8aUnwrapBytes, u8aWrapBytes } from './wrap.js';

const TEST_DATA = 'this is just some random message that we expect to be wrapped along the way';
const TEST_ETH = u8aConcat(U8A_WRAP_ETHEREUM, TEST_DATA);
const TEST_WRAP_EMPTY = `${u8aToString(U8A_WRAP_PREFIX)}${u8aToString(U8A_WRAP_POSTFIX)}`;
const TEST_WRAP_FULL = `${u8aToString(U8A_WRAP_PREFIX)}${TEST_DATA}${u8aToString(U8A_WRAP_POSTFIX)}`;
const TEST_WARP_HALF_PRE = `${u8aToString(U8A_WRAP_PREFIX)}${TEST_DATA}`;
const TEST_WRAP_HALF_POST = `${TEST_DATA}${u8aToString(U8A_WRAP_POSTFIX)}`;

describe('u8aWrapBytes', (): void => {
  it('wraps empty bytes', (): void => {
    expect(
      u8aEq(
        u8aWrapBytes(new Uint8Array()),
        u8aConcat(U8A_WRAP_PREFIX, U8A_WRAP_POSTFIX)
      )
    ).toBe(true);
  });

  it('wraps when no wrapping is detected', (): void => {
    expect(
      u8aToString(
        u8aWrapBytes(TEST_DATA)
      )
    ).toEqual(TEST_WRAP_FULL);
  });

  it('wraps when only start wrap is detected', (): void => {
    expect(
      u8aToString(
        u8aWrapBytes(TEST_WARP_HALF_PRE)
      )
    ).toEqual(`${u8aToString(U8A_WRAP_PREFIX)}${TEST_WARP_HALF_PRE}${u8aToString(U8A_WRAP_POSTFIX)}`);
  });

  it('wraps when only end wrap is detected', (): void => {
    expect(
      u8aToString(
        u8aWrapBytes(TEST_WRAP_HALF_POST)
      )
    ).toEqual(`${u8aToString(U8A_WRAP_PREFIX)}${TEST_WRAP_HALF_POST}${u8aToString(U8A_WRAP_POSTFIX)}`);
  });

  it('does not re-wrap when a wrap is already present', (): void => {
    expect(
      u8aToString(
        u8aWrapBytes(TEST_WRAP_FULL)
      )
    ).toEqual(TEST_WRAP_FULL);
  });

  it('does not re-wrap when a wrap (empty data) is already present', (): void => {
    expect(
      u8aToString(
        u8aWrapBytes(TEST_WRAP_EMPTY)
      )
    ).toEqual(TEST_WRAP_EMPTY);
  });
});

describe('unwrapBytes', (): void => {
  it('unwraps empty bytes', (): void => {
    expect(
      u8aEq(
        u8aUnwrapBytes(new Uint8Array()),
        new Uint8Array()
      )
    ).toBe(true);
  });

  it('unwraps when no wrapping is detected', (): void => {
    expect(
      u8aToString(
        u8aUnwrapBytes(TEST_DATA)
      )
    ).toEqual(TEST_DATA);
  });

  it('unwraps when no wrapping is detected (only start)', (): void => {
    expect(
      u8aToString(
        u8aUnwrapBytes(TEST_WARP_HALF_PRE)
      )
    ).toEqual(TEST_WARP_HALF_PRE);
  });

  it('unwraps when no wrapping is detected (only end)', (): void => {
    expect(
      u8aToString(
        u8aUnwrapBytes(TEST_WRAP_HALF_POST)
      )
    ).toEqual(TEST_WRAP_HALF_POST);
  });

  it('unwraps when a wrap is present', (): void => {
    expect(
      u8aToString(
        u8aUnwrapBytes(TEST_WRAP_FULL)
      )
    ).toEqual(TEST_DATA);
  });

  it('unwraps when a an empty wrap is present', (): void => {
    expect(
      u8aToString(
        u8aUnwrapBytes(TEST_WRAP_EMPTY)
      )
    ).toEqual('');
  });

  describe('Ethereum-style', (): void => {
    it('does not wrap an Ethereum wrap', (): void => {
      expect(
        u8aEq(
          u8aWrapBytes(TEST_ETH),
          TEST_ETH
        )
      ).toBe(true);
    });

    it('does not unwrap an Ethereum wrap', (): void => {
      expect(
        u8aEq(
          u8aUnwrapBytes(TEST_ETH),
          TEST_ETH
        )
      ).toBe(true);
    });
  });
});
