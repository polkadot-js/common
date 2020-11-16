// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Logger, Logger$Data } from './types';

import { formatDate } from './format/formatDate';
import { isBn } from './is/bn';
import { isFunction } from './is/function';
import { isObject } from './is/object';
import { isU8a } from './is/u8a';
import { u8aToHex } from './u8a/toHex';
import { u8aToU8a } from './u8a/toU8a';
import { isBuffer } from './is';

type ConsoleType = 'error' | 'log' | 'warn';
type LogType = ConsoleType | 'debug';

const logTo = {
  debug: 'log',
  error: 'error',
  log: 'log',
  warn: 'warn'
};

function formatOther (value: unknown): unknown {
  if (value && isObject(value) && value.constructor === Object) {
    return Object.keys(value).reduce((result: Record<string, unknown>, key): Record<string, unknown> => {
      result[key] = format(value[key]);

      return result;
    }, {});
  }

  return value;
}

export function format (value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(format);
  } else if (isBn(value)) {
    return value.toString();
  } else if (isU8a(value) || isBuffer(value)) {
    return u8aToHex(u8aToU8a(value));
  }

  return formatOther(value);
}

function apply (log: LogType, type: string, values: Logger$Data, maxSize = -1): void {
  if (values.length === 1 && isFunction(values[0])) {
    const fnResult = values[0]() as unknown;

    return apply(log, type, Array.isArray(fnResult) ? fnResult : [fnResult], maxSize);
  }

  const formatted = values.map(format).join(' ');

  console[logTo[log] as 'log'](formatDate(new Date()), type, maxSize <= 0 ? formatted : formatted.substr(0, maxSize));
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
export function logger (_type: string): Logger {
  const type = `${_type.toUpperCase()}:`.padStart(16);
  let isDebug: boolean;
  let maxSize: number;

  try {
    const isTest = process.env.NODE_ENV === 'test';

    isDebug = isTest || (
      (process.env.DEBUG || '')
        .split(',')
        .some((e) => e === '*' || _type.startsWith(e))
    );
    maxSize = parseInt(process.env.DEBUG_SIZE || '-1', 10);

    if (isNaN(maxSize)) {
      maxSize = -1;
    }
  } catch (error) {
    isDebug = false;
    maxSize = -1;
  }

  return {
    debug: isDebug
      ? (...values: Logger$Data) => apply('debug', type, values, maxSize)
      : noop,
    error: (...values: Logger$Data) => apply('error', type, values),
    log: (...values: Logger$Data) => apply('log', type, values),
    noop,
    warn: (...values: Logger$Data) => apply('warn', type, values)
  };
}
