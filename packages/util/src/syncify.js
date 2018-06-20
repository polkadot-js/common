// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import deasync from 'deasync';

import isError from './is/error';
import isUndefined from './is/undefined';

// FIXME: This is currently for Node environments only - for Browser environments deasync is not available, we need a different solution.

// flowlint-next-line unclear-type:off
export default function syncify (promise: Promise<any>): any {
  let result;

  (async () => {
    result = await promise.catch((error) => error);
  })();

  deasync.loopWhile(
    () => isUndefined(result)
  );

  if (isError(result)) {
    throw result;
  }

  return result;
}
