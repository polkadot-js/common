// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ExtErrorInterface } from '../types';

import isFunction from '../is/function';

const UNKNOWN = -99999;

function extend (that: ExtError, name: string, value?: string | number): void {
  Object.defineProperty(that, name, {
    configurable: true,
    enumerable: false,
    value
  });
}

/**
 * @name ExtError
 * @summary Extension to the basic JS Error.
 * @description
 * The built-in JavaScript Error class is extended by adding a code to allow for Error categorization. In addition to the normal `stack`, `message`, the numeric `code` and `data` (any types) parameters are available on the object.
 * @example
 * <BR>
 *
 * ```javascript
 * const { ExtError } from '@polkadot/util');
 *
 * throw new ExtError('some message', ExtError.CODES.METHOD_NOT_FOUND); // => error.code = -32601
 * ```
 */
export default class ExtError extends Error implements ExtErrorInterface {
  public code: number;

  public data?: number | string;

  public message: string;

  public name: string;

  public stack: string;

  public constructor (message = '', code: number = UNKNOWN, data?: number | string) {
    super();

    // These are actually done via extend below to clean them up
    this.code = code;
    this.data = data;
    this.name = name;
    this.message = message;
    this.stack = '';

    extend(this, 'message', String(message));
    extend(this, 'name', this.constructor.name);
    extend(this, 'data', data);
    extend(this, 'code', code);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      extend(this, 'stack', (new Error(message)).stack);
    }
  }

  public static CODES = {
    ASSERT: -90009,
    UNKNOWN,
    INVALID_JSONRPC: -99998,
    METHOD_NOT_FOUND: -32601 // Rust client
  };
}
