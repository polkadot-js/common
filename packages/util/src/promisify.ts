// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable @typescript-eslint/no-explicit-any */

// this is horrible, but we want it typed, so... 6 params should be enough for everybody?
export interface PromisifyFn {
  (cb: (error: Error | null, result?: any) => any): any;
  (a: any, cb: (error: Error | null, result?: any) => any): any;
  (a: any, b: any, cb: (error: Error | null, result?: any) => any): any;
  (a: any, b: any, c: any, cb: (error: Error | null, result?: any) => any): any;
  (a: any, b: any, c: any, d: any, cb: (error: Error | null, result?: any) => any): any;
  (a: any, b: any, c: any, d: any, e: any, cb: (error: Error | null, result?: any) => any): any;
  (a: any, b: any, c: any, d: any, e: any, f: any, cb: (error: Error | null, result?: any) => any): any;
}

type ParamType = [] | [any] | [any, any] | [any, any, any]| [any, any, any, any]| [any, any, any, any, any]| [any, any, any, any, any, any];

/**
 * @name promisify
 * @summary Wraps an async callback into a `Promise`
 * @description
 * Wraps the supplied async function `fn` that has a standard JS callback `(error: Error, result: any)` into a `Promise`, passing the supplied parameters. When `error` is set, the Promise is rejected, else the Promise resolves with the `result` value.
 * @example
 * <BR>
 *
 * ```javascript
 * const { promisify } from '@polkadot/util';
 *
 * await promisify(null, ((a, cb) => cb(null, a), true); // resolves with `true`
 * await promisify(null, (cb) => cb(new Error('error!'))); // rejects with `error!`
 * ```
 */
export default function promisify (self: any, fn: PromisifyFn, ...params: ParamType): Promise<any> {
  return new Promise((resolve, reject): void => {
    fn.apply(self, params.concat([
      // @ts-ignore
      (error: Error | null, result?: any): void => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ]));
  });
}
