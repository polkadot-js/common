// Copyright 2017-2022 @polkadot/util authors & contributors
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
    try {
      onExec();
    } catch (error) {
      if (onError) {
        onError(error as Error);
      } else {
        console.error(error);
      }
    }
  }, 0);
}
