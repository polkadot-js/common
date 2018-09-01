// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { DecodedRlp, Trie$Node$Type, HashFn } from './types';

import isU8a from '@polkadot/util/is/u8a';
import u8aToHex from '@polkadot/util/u8a/toHex';
import encodeRlp from '@polkadot/util-rlp/encode';
import nibblesToU8a from '@polkadot/trie-hash/util/fromNibbles';

import nibblesFromU8a from './nibbles/fromU8a';

function addHexPrefix (key: Array<number>, isTerminator: boolean): Array<number> {
  // odd
  if (key.length % 2) {
    key.unshift(1);
  } else {
    // even
    key.unshift(0);
    key.unshift(0);
  }

  if (isTerminator) {
    key[0] += 2;
  }

  return key;
}

function removeHexPrefix (key: Uint8Array): Uint8Array {
  return key[0] % 2
    ? key.slice(1)
    : key.slice(2);
}

export default class TrieNode {
  hashing: HashFn;
  raw: DecodedRlp;
  type: Trie$Node$Type;

  constructor (hashing: HashFn, type: Trie$Node$Type, raw: DecodedRlp) {
    this.hashing = hashing;
    this.raw = raw;
    this.type = type;
  }

  get value () {
    return this.getValue();
  }

  set value (v) {
    this.setValue(v);
  }

  get key () {
    return this.getKey();
  }

  set key (k) {
    // @ts-ignore FIXME, we need to properly check the full file
    this.setKey(k);
  }

  setValue (key: number | Uint8Array, value?: Uint8Array) {
    if (this.type !== 'branch') {
      this.raw[1] = key as Uint8Array;
      return;
    }

    if (arguments.length === 1) {
      value = key as Uint8Array;
      key = 16;
    }

    this.raw[key as number] = value as Uint8Array;
  }

  getValue (key?: number) {
    if (this.type !== 'branch') {
      return this.raw[1];
    }

    if (arguments.length === 0) {
      key = 16;
    }

    // @ts-ignore FIXME, we need to properly check the full file
    const val = this.raw[key];

    if (val !== null && val !== undefined && val.length !== 0) {
      return val;
    }
  }

  setKey (key: Array<number> | Uint8Array) {
    if (this.type !== 'branch') {
      if (Array.isArray(key)) {
        key = key.slice(0); // copy the key
      } else {
        key = nibblesFromU8a(key);
      }

      key = addHexPrefix(key, this.type === 'leaf');
      this.raw[0] = nibblesToU8a(key);
    }
  }

  getKey () {
    if (this.type !== 'branch') {
      return removeHexPrefix(
        // @ts-ignore FIXME, we need to properly check the full file
        nibblesFromU8a(this.raw[0])
      );
    }
  }

  serialize (): Uint8Array {
    return encodeRlp(this.raw);
  }

  hash (): Uint8Array {
    return this.hashing(this.serialize());
  }

  toString (): string {
    const format = (value: any): string => {
      if (isU8a(value)) {
        return u8aToHex(value);
      } else if (Array.isArray(value)) {
        return `[${value.map((v) => format(v))}]`;
      } else if (value) {
        return 'object';
      }

      return 'empty';
    };

    return this.raw.reduce((out, el, index) => {
      return `${out}${index ? ', ' : ''}${format(el)}`;
    }, `${this.type}: [`) + ']';
  }

  getChildren () {
    const children = [];

    switch (this.type) {
      case 'leaf':
        // no children
        break;
      case 'extention':
        // one child
        children.push([this.key, this.getValue()]);
        break;
      case 'branch':
        let end = 16;

        for (let index = 0; index < end; index++) {
          const value = this.getValue(index);

          if (value) {
            children.push([
              [index], value
            ]);
          }
        }
        break;
    }

    return children;
  }
}
