// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @internal */
function zeroPad (value: number): string {
  return value.toString().padStart(2, '0');
}

/**
 * @name formatDate
 * @description Formats a date in CCYY-MM-DD HH:MM:SS format
 */
export function formatDate (date: Date): string {
  const year = date.getFullYear().toString();
  const month = zeroPad((date.getMonth() + 1));
  const day = zeroPad(date.getDate());
  const hour = zeroPad(date.getHours());
  const minute = zeroPad(date.getMinutes());
  const second = zeroPad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
