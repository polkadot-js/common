// Copyright 2017-2020 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { fromNibbles, toNibbles } from './util';

const HP_FLAG_2 = 2;
const HP_FLAG_0 = 0;

const NIBBLE_TERMINATOR = 16;

const NEEDS_TERMINATOR = [HP_FLAG_2, HP_FLAG_2 + 1];
const IS_ODD_LENGTH = [HP_FLAG_0 + 1, HP_FLAG_2 + 1];

export function isNibblesTerminated (nibbles: Uint8Array): boolean {
  return nibbles[nibbles.length - 1] === NIBBLE_TERMINATOR;
}

export function addNibblesTerminator (nibbles: Uint8Array): Uint8Array {
  if (isNibblesTerminated(nibbles)) {
    return nibbles;
  }

  const terminated = new Uint8Array(nibbles.length + 1);

  terminated.set(nibbles);
  terminated[nibbles.length] = NIBBLE_TERMINATOR;

  return terminated;
}

export function removeNibblesTerminator (nibbles: Uint8Array): Uint8Array {
  if (isNibblesTerminated(nibbles)) {
    return nibbles.subarray(0, nibbles.length - 1);
  }

  return nibbles;
}

export function decodeNibbles (value: null | Uint8Array): Uint8Array {
  const nibblesWithFlag = toNibbles(value);
  const [flag] = nibblesWithFlag;

  const rawNibbles = IS_ODD_LENGTH.includes(flag)
    ? nibblesWithFlag.subarray(1)
    : nibblesWithFlag.subarray(2);

  return NEEDS_TERMINATOR.includes(flag)
    ? addNibblesTerminator(rawNibbles)
    : rawNibbles;
}

export function encodeNibbles (nibbles: Uint8Array): Uint8Array {
  const flag = isNibblesTerminated(nibbles)
    ? HP_FLAG_2
    : HP_FLAG_0;
  const rawNibbles = removeNibblesTerminator(nibbles);
  const prefix = rawNibbles.length % 2
    ? [flag + 1]
    : [flag, 0];
  const prefixed = new Uint8Array(prefix.length + rawNibbles.length);

  prefixed.set(prefix);
  prefixed.set(rawNibbles, prefix.length);

  return fromNibbles(prefixed);
}

export function extractKey (key: null | Uint8Array): Uint8Array {
  return removeNibblesTerminator(
    decodeNibbles(key)
  );
}

export function extractNodeKey ([key]: (null | Uint8Array)[]): Uint8Array {
  return removeNibblesTerminator(
    decodeNibbles(key)
  );
}
