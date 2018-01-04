// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { ExtErrorInterface } from '../types';

const isFunction = require('../is/function');

const UNKNOWN = -99999;

/**
  @name ExtError
  @signature ExtError (message: string = '', code: number = UNKNOWN_ERROR, value: any)
  @summary Extension to the basic JS Error.
  @description
    The built-in JavaScript Error class is extended by adding a code to allow for Error categorization. In addition to the normal `stack`, `message`, the numeric `code` and `data` (mixed types) parameters are available on the object.
  @example
    const { ExtError } = require('@polkadot/util');

    throw new ExtError('some message', ExtError.CODES.METHOD_NOT_FOUND); // => error.code = -32601
*/
module.exports = class ExtError extends Error implements ExtErrorInterface {
  code: number;
  data: mixed;
  message: string;
  name: string;
  stack: string;

  constructor (message: string = '', code: number = UNKNOWN, data: mixed) {
    super();

    const extend = (name: string, value: mixed): void => {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: false,
        value
      });
    };

    extend('message', String(message));
    extend('name', this.constructor.name);
    extend('data', data);
    extend('code', code);

    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      extend('stack', (new Error(message)).stack);
    }
  }

  static CODES = {
    ASSERT: -90009,
    UNKNOWN,
    INVALID_JSONRPC: -99998,
    METHOD_NOT_FOUND: -32601 // Rust client
  };
};
