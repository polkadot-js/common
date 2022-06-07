// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Time } from './types';

const HRS = 60 * 60;
const DAY = HRS * 24;
const ZERO: Time = { days: 0, hours: 0, milliseconds: 0, minutes: 0, seconds: 0 };

/**
 * @name addTime
 * @summary Add together two Time arrays
 */

function add (a: Partial<Time>, b: Time): Time {
  return {
    days: (a.days || 0) + b.days,
    hours: (a.hours || 0) + b.hours,
    milliseconds: (a.milliseconds || 0) + b.milliseconds,
    minutes: (a.minutes || 0) + b.minutes,
    seconds: (a.seconds || 0) + b.seconds
  };
}

function extractDays (milliseconds: number, hrs: number): Time {
  const days = ~~(hrs / 24);

  return add({ days }, extractTime(milliseconds - (days * DAY * 1000)));
}

function extractHrs (milliseconds: number, mins: number): Time {
  const hrs = mins / 60;

  if (hrs < 24) {
    const hours = ~~hrs;

    return add({ hours }, extractTime(milliseconds - (hours * HRS * 1000)));
  }

  return extractDays(milliseconds, hrs);
}

function extractMins (milliseconds: number, secs: number): Time {
  const mins = secs / 60;

  if (mins < 60) {
    const minutes = ~~mins;

    return add({ minutes }, extractTime(milliseconds - (minutes * 60 * 1000)));
  }

  return extractHrs(milliseconds, mins);
}

function extractSecs (milliseconds: number): Time {
  const secs = milliseconds / 1000;

  if (secs < 60) {
    const seconds = ~~secs;

    return add({ seconds }, extractTime(milliseconds - (seconds * 1000)));
  }

  return extractMins(milliseconds, secs);
}

/**
 * @name extractTime
 * @summary Convert a quantity of seconds to Time array representing accumulated {days, minutes, hours, seconds, milliseconds}
 * @example
 * <BR>
 *
 * ```javascript
 * import { extractTime } from '@polkadot/util';
 *
 * const { days, minutes, hours, seconds, milliseconds } = extractTime(6000); // 0, 0, 10, 0, 0
 * ```
 */
export function extractTime (milliseconds?: number): Time {
  return !milliseconds
    ? ZERO
    : milliseconds < 1000
      ? add({ milliseconds }, ZERO)
      : extractSecs(milliseconds);
}
