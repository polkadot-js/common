// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name promisify
  @signature function promisify (this: ?Object, fn: Function, ...params: Array<mixed>): Promise<any>
  @summary Wraps an async callback into a `Promise`
  @description
    Wraps the supplied async function `fn` that has a standard JS callback `(error: Error, result: any)` into a `Promise`, passing the supplied parameters. When `error` is set, the Promise is rejected, else the Promise resolves with the `result` value.
  @example
    const promisify = require('@polkadot/util/promisify');

    await promisify(null, ((a, cb) => cb(null, a), true); // resolves with `true`
    await promisify(null, (cb) => cb(new Error('error!'))); // rejects with `error!`
*/
// flowlint-next-line unclear-type:off
module.exports = function promisify (self: ?Object, fn: Function, ...params: Array<mixed>): Promise<any> {
  return new Promise((resolve, reject) => {
    fn.apply(self, params.concat([
      // flowlint-next-line unclear-type:off
      (error: ?Error, result: any): void => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ]));
  });
};
