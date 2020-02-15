// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/** @internal */
function zeroPad (value: number): string {
  return value.toString().padStart(2, '0');
}

export default function formatDate (date: Date): string {
  const year = date.getFullYear().toString();
  const month = zeroPad((date.getMonth() + 1));
  const day = zeroPad(date.getDate());
  const hour = zeroPad(date.getHours());
  const minute = zeroPad(date.getMinutes());
  const second = zeroPad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
