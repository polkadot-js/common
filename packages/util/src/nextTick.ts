// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name nextTick
 * @description Defer the operation to the queue for evaluation on the next tick
 */
export function nextTick (onExec: () => unknown, onError?: (error: Error) => unknown): void {
  // While Promise.resolve().then(...) would defer to the nextTick, this
  // actually does not play as nicely in browsers like the setTimeout(...)
  // approach. So the safer, though less optimal approach is the one taken here
  setTimeout((): void => {
    Promise
      .resolve()
      .then((): void => {
        onExec();
      })
      .catch((error: Error): void => {
        if (onError) {
          onError(error);
        } else {
          console.error(error);
        }
      });
  }, 0);
}
