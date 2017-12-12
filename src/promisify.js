// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('./assert');
const isFunction = require('./is/function');

/**
  @name promisify
  @signature function promisify (fn: (any) => void, ...params: Array<any>): Promise<any>
  @summary Wraps an async callback into a `Promise`
  @description
    Wraps the supplied async function `fn` that has a standard JS callback `(error: Error, result: any)` into a `Promise`, passing the supplied parameters. When `error` is set, the Promise is rejected, else the Promise resolves with the `result` value.
  @example
    const promisify = require('@polkadot/util/promisify');

    await promisify((a, cb) => cb(null, a), true); // resolves with `true`
    await promisify((cb) => cb(new Error('error!'))); // rejects with `error!`
*/
module.exports = function promisify (fn: (any) => void, ...params: Array<any>): Promise<any> {
  assert(isFunction(fn), 'Expected function input to promisify');

  return new Promise((resolve, reject) => {
    fn.apply(null, [].concat(params, [
      (error: Error, result: any): void => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ]));
  });
};
