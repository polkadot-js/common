// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name nextTick
 * @description Defer the operation to the queue for evaluation on the next tick
 */
export function nextTick (onExec: () => unknown, onError?: (error: Error) => unknown): void {
  Promise
    .resolve()
    .then((): void => {
      onExec();
    })
    .catch((error): void => {
      if (onError) {
        onError(error as Error);
      } else {
        console.error(error);
      }
    });
}
