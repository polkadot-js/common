// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Logger, Logger$Data } from './types';

import { formatDate } from './format/formatDate';
import { isBn } from './is/bn';
import { isBuffer } from './is/buffer';
import { isFunction } from './is/function';
import { isObject } from './is/object';
import { isU8a } from './is/u8a';
import { u8aToHex } from './u8a/toHex';
import { u8aToU8a } from './u8a/toU8a';

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
      result[key] = loggerFormat(value[key]);

      return result;
    }, {});
  }

  return value;
}

export function loggerFormat (value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(loggerFormat);
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

  console[logTo[log] as 'log'](
    formatDate(new Date()),
    type,
    ...values
      .map(loggerFormat)
      .map((v) => {
        if (maxSize <= 0) {
          return v;
        }

        const r = `${v as string}`;

        return r.length < maxSize
          ? v
          : `${r.substr(0, maxSize)} ...`;
      })
  );
}

function noop (): void {
  // noop
}

function parseEnv (type: string): [boolean, number] {
  const maxSize = parseInt((typeof process === 'object' ? process : {})?.env?.DEBUG_MAX || '-1', 10);

  return [
    ((typeof process === 'object' ? process : {})?.env?.DEBUG || '').toLowerCase().split(',').some((e) => !!e && (e === '*' || type.startsWith(e))),
    isNaN(maxSize) ? -1 : maxSize
  ];
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
 * import { logger } from '@polkadot';
 *
 * const l = logger('test');
 * ```
 */
export function logger (_type: string): Logger {
  const type = `${_type.toUpperCase()}:`.padStart(16);
  const [isDebug, maxSize] = parseEnv(_type.toLowerCase());

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
