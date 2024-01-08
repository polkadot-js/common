// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Logger } from './types.js';

import { xglobal } from '@polkadot/x-global';

import { formatDate } from './format/formatDate.js';
import { isBn } from './is/bn.js';
import { isBuffer } from './is/buffer.js';
import { isFunction } from './is/function.js';
import { isObject } from './is/object.js';
import { isU8a } from './is/u8a.js';
import { u8aToHex } from './u8a/toHex.js';
import { u8aToU8a } from './u8a/toU8a.js';
import { noop } from './noop.js';

type ConsoleType = 'error' | 'log' | 'warn';
type LogType = ConsoleType | 'debug';

const logTo = {
  debug: 'log',
  error: 'error',
  log: 'log',
  warn: 'warn'
} as const;

function formatOther (value: unknown): unknown {
  if (value && isObject(value) && value.constructor === Object) {
    const result: Record<string, unknown> = {};

    for (const [k, v] of Object.entries(value)) {
      result[k] = loggerFormat(v);
    }

    return result;
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

function formatWithLength (maxLength: number): (v: unknown) => unknown {
  return (v: unknown): unknown => {
    if (maxLength <= 0) {
      return v;
    }

    const r = `${v as string}`;

    return r.length < maxLength
      ? v
      : `${r.substring(0, maxLength)} ...`;
  };
}

function apply (log: LogType, type: string, values: unknown[], maxSize = -1): void {
  if (values.length === 1 && isFunction(values[0])) {
    const fnResult = values[0]() as unknown;

    return apply(log, type, Array.isArray(fnResult) ? fnResult : [fnResult], maxSize);
  }

  console[logTo[log]](
    formatDate(new Date()),
    type,
    ...values
      .map(loggerFormat)
      .map(formatWithLength(maxSize))
  );
}

function isDebugOn (e: string, type: string): boolean {
  return !!e && (
    e === '*' ||
    type === e ||
    (
      e.endsWith('*') &&
      type.startsWith(e.slice(0, -1))
    )
  );
}

function isDebugOff (e: string, type: string): boolean {
  return !!e && (
    e.startsWith('-') &&
    (
      type === e.slice(1) ||
      (
        e.endsWith('*') &&
        type.startsWith(e.slice(1, -1))
      )
    )
  );
}

function getDebugFlag (env: readonly string[], type: string): boolean {
  let flag = false;

  for (const e of env) {
    if (isDebugOn(e, type)) {
      flag = true;
    } else if (isDebugOff(e, type)) {
      flag = false;
    }
  }

  return flag;
}

function parseEnv (type: string): [boolean, number] {
  const maxSize = parseInt(xglobal.process?.env?.['DEBUG_MAX'] || '-1', 10);

  return [
    getDebugFlag((xglobal.process?.env?.['DEBUG'] || '').toLowerCase().split(','), type),
    isNaN(maxSize)
      ? -1
      : maxSize
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
 * import { logger } from '@polkadot/util';
 *
 * const l = logger('test');
 * ```
 */
export function logger (origin: string): Logger {
  const type = `${origin.toUpperCase()}:`.padStart(16);
  const [isDebug, maxSize] = parseEnv(origin.toLowerCase());

  return {
    debug: isDebug
      ? (...values: unknown[]) => apply('debug', type, values, maxSize)
      : noop,
    error: (...values: unknown[]) => apply('error', type, values),
    log: (...values: unknown[]) => apply('log', type, values),
    noop,
    warn: (...values: unknown[]) => apply('warn', type, values)
  };
}
