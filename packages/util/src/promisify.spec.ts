// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { promisify } from '.';

describe('promisify', (): void => {
  it('handles functions with no parameters (resolve)', (): Promise<void> => {
    const fn = (cb: (error: null, value: [boolean, string, number]) => void): void =>
      cb(null, [true, 'test', 1]);

    return promisify(null, fn).then((result): void => {
      expect(result).toEqual([true, 'test', 1]);
    });
  });

  it('handles functions with no parameters (reject)', (): Promise<void> => {
    const fn = (cb: (error: Error, result?: boolean) => void): void =>
      cb(new Error('test reject'));

    return promisify(null, fn)
      .then((): void => {
        throw new Error('Received unexpected result');
      })
      .catch((error: Error): void => {
        expect(error.message).toEqual('test reject');
      });
  });

  it('handles functions with parameters (resolve)', (): Promise<void> => {
    const fn = (a: number, b: boolean, cb: (error: Error | null, result?: [number, boolean]) => void): void =>
      cb(null, [a, b]);

    return promisify(null, fn, 2, false).then((result: [number, boolean]): void => {
      expect(result).toEqual([2, false]);
    });
  });

  it('handles functions with parameters (reject)', (): Promise<void> => {
    const fn = (a: number, b: boolean, c: string, cb: (error: Error | null, result?: [number, boolean, string]) => void): void =>
      cb(new Error(`test reject: ${a},${b.toString()},${c}`));

    return promisify(null, fn, 3, 'string', true).catch((error: Error): void => {
      expect(error.message).toEqual('test reject: 3,string,true');
    });
  });
});
