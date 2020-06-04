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
    seconds: a.seconds + b.seconds
  };
}

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

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
export default function extractTime (seconds?: number): Time {
  if (!seconds) {
    return ZERO;
  } else if (seconds < 60) {
    return { ...ZERO, seconds };
  }

  const mins = seconds / 60;

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
