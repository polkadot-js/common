// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * A sharable identity function. Returns the input as-is with no transformation applied.
 */
export function identity <T> (value: T): T {
  return value;
}

/**
 * A sharable noop function. As the name suggests, does nothing
 */
export function noop (): void {
  // noop
}
