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
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}

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
export default function extractTime (value?: number): Time {
  if (!value) {
    return [0, 0, 0, 0];
  } else if (value < 60) {
    return [0, 0, 0, value];
  }

  const mins = value / 60;

  if (mins < 60) {
    const round = Math.floor(mins);

    return addTime([0, 0, round, 0], extractTime(value - (round * 60)));
  }

  const hrs = mins / 60;

  if (hrs < 24) {
    const round = Math.floor(hrs);

    return addTime([0, round, 0, 0], extractTime(value - (round * HRS)));
  }

  const round = Math.floor(hrs / 24);

  return addTime([round, 0, 0, 0], extractTime(value - (round * DAY)));
}
