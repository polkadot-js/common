// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Time } from './types';

import { objectSpread } from './object/spread';

const HRS = 60 * 60;
const DAY = HRS * 24;

/**
 * @name addTime
 * @summary Add together two Time arrays
 */

function addTime (a: Time, b: Time): Time {
  return {
    days: a.days + b.days,
    hours: a.hours + b.hours,
    milliseconds: a.milliseconds + b.milliseconds,
    minutes: a.minutes + b.minutes,
    seconds: a.seconds + b.seconds
  };
}

const ZERO: Time = { days: 0, hours: 0, milliseconds: 0, minutes: 0, seconds: 0 };

function extractDays (milliseconds: number, hrs: number): Time {
  const days = Math.floor(hrs / 24);

  return addTime(objectSpread({}, ZERO, { days }), extractTime(milliseconds - (days * DAY * 1000)));
}

function extractHrs (milliseconds: number, mins: number): Time {
  const hrs = mins / 60;

  if (hrs < 24) {
    const hours = Math.floor(hrs);

    return addTime(objectSpread({}, ZERO, { hours }), extractTime(milliseconds - (hours * HRS * 1000)));
  }

  return extractDays(milliseconds, hrs);
}

function extractMins (milliseconds: number, secs: number): Time {
  const mins = secs / 60;

  if (mins < 60) {
    const minutes = Math.floor(mins);

    return addTime(objectSpread({}, ZERO, { minutes }), extractTime(milliseconds - (minutes * 60 * 1000)));
  }

  return extractHrs(milliseconds, mins);
}

function extractSecs (milliseconds: number): Time {
  const secs = milliseconds / 1000;

  if (secs < 60) {
    const seconds = Math.floor(secs);

    return addTime(objectSpread({}, ZERO, { seconds }), extractTime(milliseconds - (seconds * 1000)));
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
  if (!milliseconds) {
    return ZERO;
  } else if (milliseconds < 1000) {
    return objectSpread({}, ZERO, { milliseconds });
  }

  return extractSecs(milliseconds);
}
