// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isJsonObject } from './index.js';

const jsonObject = `{
    "Test": "1234",
    "NestedTest": {
      "Test": "5678"
    }
  }`;

describe('isJsonObject', (): void => {
  it('returns true on empty objects', (): void => {
    expect(
      isJsonObject({})
    ).toEqual(true);
  });

  it('returns true on JSON objects', (): void => {
    expect(
      isJsonObject(jsonObject)
    ).toEqual(true);
  });

  it('returns false on JSON parsable value typeof number', (): void => {
    expect(
      isJsonObject(1234)
    ).toEqual(false);
  });

  it('returns false on JSON parsable value null', (): void => {
    expect(
      isJsonObject(null)
    ).toEqual(false);
  });

  it('returns false on invalid objects', (): void => {
    expect(
      isJsonObject('notAnObject')
    ).toEqual(false);
  });

  it('returns false on invalid JSON', (): void => {
    expect(
      isJsonObject('{"abc", "def"}')
    ).toEqual(false);
  });
});
