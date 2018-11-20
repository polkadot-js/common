// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import deasync from 'deasync';

import isError from './is/error';

// FIXME: This is currently for Node environments only - for Browser environments deasync is not available, we need a different solution.

export default function syncify (promise: Promise<any>): any {
  let result: any;
  let hasResult = false;

  // tslint:disable-next-line
  (async () => {
    try {
      result = await promise;
    } catch (error) {
      result = error;
    }

    hasResult = true;
  })();

  deasync.loopWhile(
    () => hasResult === false
  );

  if (isError(result)) {
    throw result;
  }

  return result;
}
