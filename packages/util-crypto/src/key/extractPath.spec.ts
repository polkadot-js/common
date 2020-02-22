// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import keyExtractPath, { ExtractResult } from './extractPath';

describe('keyExtractPath', (): void => {
  it('extracts properly from soft', (): void => {
    const test = keyExtractPath('/1');

    expect(test.parts).toEqual(['/1']);
    expect(test.path.length).toEqual(1);
    expect(test.path[0].isHard).toEqual(false);
    expect(test.path[0].chainCode).toEqual(Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  });

  it('extracts properly from hard', (): void => {
    const test = keyExtractPath('//1');

    expect(test.parts).toEqual(['//1']);
    expect(test.path.length).toEqual(1);
    expect(test.path[0].isHard).toEqual(true);
    expect(test.path[0].chainCode).toEqual(Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  });

  it('extracts properly from hard/soft', (): void => {
    const test = keyExtractPath('//1/2');

    expect(test.parts).toEqual(['//1', '/2']);
    expect(test.path.length).toEqual(2);
    expect(test.path[0].isHard).toEqual(true);
    expect(test.path[0].chainCode).toEqual(Uint8Array.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    expect(test.path[1].isHard).toEqual(false);
    expect(test.path[1].chainCode).toEqual(Uint8Array.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  });

  it('does not extract from invalid paths', (): void => {
    expect(
      (): ExtractResult => keyExtractPath('1/2')
    ).toThrow(/does not match input/);
  });

  it('does not extract from invalid paths', (): void => {
    expect(
      (): ExtractResult => keyExtractPath('hello')
    ).toThrow(/does not match input/);
  });
});
