// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isJsonObject } from '.';

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
