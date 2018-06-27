// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import deasync from 'deasync';

import isError from './is/error';
import isUndefined from './is/undefined';

// FIXME: This is currently for Node environments only - for Browser environments deasync is not available, we need a different solution.

export default function syncify (promise: Promise<any>): any {
  let result: any;

  // tslint:disable-next-line
  (async () => {
    try {
      result = await promise;
    } catch (error) {
      result = error;
    }
  })();

  deasync.loopWhile(
    () => isUndefined(result)
  );

  if (isError(result)) {
    throw result;
  }

  return result;
}
