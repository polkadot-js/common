// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { SemaphorePromise } from '../types';

import semaphore from 'semaphore';

export default function semaphorePromise (max: number): SemaphorePromise {
  const _semaphore = semaphore(max);

  return (fn: () => Promise<any>): Promise<any> => {
    return new Promise((resolve, reject) => {
      _semaphore.take(async () => {
        try {
          const result = await fn();

          _semaphore.leave();
          resolve(result);
        } catch (error) {
          _semaphore.leave();
          reject(error);
        }
      });
    });
  };
}
