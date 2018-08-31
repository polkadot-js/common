// Copyright 2017-2018 @polkadot/trie-db-ext authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import isNull from '@polkadot/util/is/null';

import { EncodedPath, Node } from '../types';

import { isKvNode } from './is';
import { addNibblesTerminator, decodeNibbles, encodeNibbles, removeNibblesTerminator } from './nibbles';

export function extractKey (node: Node): Uint8Array {
  if (!isKvNode(node)) {
    throw new Error('Can only extract keys from KV branches');
  }

  const [prefixedKey] = node;

  return removeNibblesTerminator(
    decodeNibbles(prefixedKey)
  );
}

export function keyEquals (key: Uint8Array | null, test: Uint8Array | null): boolean {
  if (isNull(key) && isNull(test)) {
    return true;
  } else if (isNull(key) || isNull(test) || (key.length !== test.length)) {
    return false;
  }

  return keyStartsWith(key, test);
}

export function keyStartsWith (key: Uint8Array | null, partial: Uint8Array | null): boolean {
  if (isNull(key) && isNull(partial)) {
    return true;
  } else if (isNull(key) || isNull(partial) || (key.length < partial.length)) {
    return false;
  }

  for (let index = 0; index < partial.length; index++) {
    if (key[index] !== partial[index]) {
      return false;
    }
  }

  return true;
}

export function computeExtensionKey (nibbles: Uint8Array): EncodedPath {
  return encodeNibbles(nibbles);
}

export function computeLeafKey (nibbles: Uint8Array): EncodedPath {
  return encodeNibbles(
    addNibblesTerminator(nibbles)
  );
}

export function getCommonPrefixLength (left: Uint8Array, right: Uint8Array): number {
  for (let index = 0; index < left.length && index < right.length; index++) {
    if (left[index] !== right[index]) {
      return index;
    }
  }

  return Math.min(left.length, right.length);
}

export function consumeCommonPrefix (left: Uint8Array, right: Uint8Array): [Uint8Array, Uint8Array, Uint8Array] {
  const length = getCommonPrefixLength(left, right);

  return [
    left.subarray(0, length),
    left.subarray(length),
    right.subarray(length)
  ];
}
