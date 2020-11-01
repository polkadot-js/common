// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Logger, Logger$Data } from './types';

import formatDate from './format/formatDate';
import isBn from './is/bn';
import isFunction from './is/function';
import isObject from './is/object';
import isU8a from './is/u8a';
import u8aToHex from './u8a/toHex';
import u8aToU8a from './u8a/toU8a';
import { isBuffer } from './is';

type ConsoleType = 'error' | 'log' | 'warn';
type LogType = ConsoleType | 'debug';

const logTo = {
  debug: 'log',
  error: 'error',
  log: 'log',
  warn: 'warn'
};

function formatObject (value: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  return Object.keys(value).reduce((result, key): Record<string, unknown> => {
    result[key] = format(value[key]);

    return result;
  }, result);
}

export function format (value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(format);
  } else if (isBn(value)) {
    return value.toString();
  } else if (isU8a(value) || isBuffer(value)) {
    return u8aToHex(u8aToU8a(value));
  } else if (value && isObject(value) && value.constructor === Object) {
    return formatObject(value);
  }

  return value;
}

function apply (log: LogType, type: string, values: Logger$Data): void {
  if (values.length === 1 && isFunction(values[0])) {
    const fnResult = values[0]() as unknown;

    return apply(log, type, Array.isArray(fnResult) ? fnResult : [fnResult]);
  }

  console[logTo[log] as 'log'](
    formatDate(new Date()),
    type,
    ...values.map(format)
  );
}

function noop (): void {
  // noop
}

/**
 * @name Logger
 * @summary Creates a consistent log interface for messages
 * @description
 * Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (controlled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.
 * @example
 * <BR>
 *
 * ```javascript
 * const l from '@polkadot/util/logger')('test');
 *
 * l.log('blah'); // <date>     TEST: blah
 * ```
 */
export default function logger (_type: string): Logger {
  const type = `${_type.toUpperCase()}:`.padStart(16);
  let isDebug;

  try {
    const isTest = process.env.NODE_ENV === 'test';
    const debugList = (process.env.DEBUG || '').split(',');

    isDebug = isTest || !!debugList.find((entry): boolean => _type.startsWith(entry));
  } catch (error) {
    isDebug = false;
  }

  return {
    debug: isDebug
      ? (...values: Logger$Data): void => apply('debug', type, values)
      : noop,
    error: (...values: Logger$Data): void => apply('error', type, values),
    log: (...values: Logger$Data): void => apply('log', type, values),
    noop,
    warn: (...values: Logger$Data): void => apply('warn', type, values)
  };
}
