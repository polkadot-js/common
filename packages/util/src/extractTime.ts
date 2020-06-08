// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Time } from './types';

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
    minutes: a.minutes + b.minutes,
    seconds: a.seconds + b.seconds,
    milliseconds: a.milliseconds + b.milliseconds
  };
}

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };

/**
 * @name extractTime
 * @summary Convert a quantity of seconds to Time array representing accumulated [days, minutes, hours, seconds]
 * @example
 * <BR>
 *
 * ```javascript
 * import { extractTime } from '@polkadot/util';
 *
 * const [days, minutes, hours, seconds] = extractTime(6000); // [0, 0, 10, 0]
 * ```
 */
export default function extractTime (milliseconds?: number): Time {
  if (!milliseconds) {
    return ZERO;
  } else if (milliseconds < 1000) {
    return { ...ZERO, milliseconds };
  }

  const secs = milliseconds / 1000;

  if (sec < 60) {
    const seconds = Math.floor(sec);

    return addTime({ ...ZERO, seconds }, extractTime(milliseconds - (seconds * 1000)));
  }

  const mins = secs / 60;

  if (mins < 60) {
    const minutes = Math.floor(mins);

    return addTime({ ...ZERO, minutes }, extractTime(seconds - (minutes * 60)));
  }

  const hrs = mins / 60;

  if (hrs < 24) {
    const hours = Math.floor(hrs);

    return addTime({ ...ZERO, hours }, extractTime(seconds - (hours * HRS)));
  }

  const days = Math.floor(hrs / 24);

  return addTime({ ...ZERO, days }, extractTime(seconds - (days * DAY)));
}
