// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ExtErrorInterface } from '../types';

import isFunction from '../is/function';

const UNKNOWN = -99999;

// flowlint-next-line unclear-type:off
function extend (that: any, name: string, value: mixed): void {
  Object.defineProperty(that, name, {
    configurable: true,
    enumerable: false,
    value
  });
}

/**
  @name ExtError
  @signature ExtError (message: string = '', code: number = UNKNOWN_ERROR, value: any)
  @summary Extension to the basic JS Error.
  @description
    The built-in JavaScript Error class is extended by adding a code to allow for Error categorization. In addition to the normal `stack`, `message`, the numeric `code` and `data` (mixed types) parameters are available on the object.
  @example
    const { ExtError } from '@polkadot/util');

    throw new ExtError('some message', ExtError.CODES.METHOD_NOT_FOUND); // => error.code = -32601
*/
export default class ExtError extends Error implements ExtErrorInterface {
  code: number;
  data: mixed;
  message: string;
  name: string;
  stack: string;

  constructor (message: string = '', code: number = UNKNOWN, data: mixed) {
    super();

    extend(this, 'message', String(message));
    extend(this, 'name', this.constructor.name);
    extend(this, 'data', data);
    extend(this, 'code', code);

    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      extend(this, 'stack', (new Error(message)).stack);
    }
  }

  static CODES = {
    ASSERT: -90009,
    UNKNOWN,
    INVALID_JSONRPC: -99998,
    METHOD_NOT_FOUND: -32601 // Rust client
  };
}
