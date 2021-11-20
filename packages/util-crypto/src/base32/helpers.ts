// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '@polkadot/util/types';

import { assert, u8aToU8a } from '@polkadot/util';

interface BaseCoder {
  decode: (value: string) => Uint8Array;
  encode: (value: Uint8Array) => string;
}

interface Config {
  alphabet: string;
  ipfsChar?: string;
  regex?: RegExp;
  type: string;
}

type DecodeFn = (value: string, ipfsCompat?: boolean) => Uint8Array;

type EncodeFn = (value: U8aLike, ipfsCompat?: boolean) => string;

type ValidateFn = (value?: unknown, ipfsCompat?: boolean) => value is string;

export function createDecode (base: BaseCoder, validate: ValidateFn): DecodeFn {
  return (value: string, ipfsCompat?: boolean): Uint8Array => {
    validate(value, ipfsCompat);

    return base.decode(
      ipfsCompat
        ? value.substr(1)
        : value
    );
  };
}

export function createEncode ({ ipfsChar }: Config, base: BaseCoder): EncodeFn {
  return (value: U8aLike, ipfsCompat?: boolean): string => {
    const out = base.encode(u8aToU8a(value));

    return ipfsChar && ipfsCompat
      ? `${ipfsChar}${out}`
      : out;
  };
}

export function createIs (validate: ValidateFn): ValidateFn {
  return (value?: unknown, ipfsCompat?: boolean): value is string => {
    try {
      return validate(value, ipfsCompat);
    } catch (error) {
      return false;
    }
  };
}

export function createValidate ({ alphabet, ipfsChar, regex, type }: Config): ValidateFn {
  return (value?: unknown, ipfsCompat?: boolean): value is string => {
    assert(value && typeof value === 'string', () => `Expected non-null, non-empty ${type} string input`);

    if (ipfsChar) {
      assert(!ipfsCompat || value[0] === ipfsChar, () => `Expected ${type} to start with '${ipfsChar}'`);
    }

    if (regex) {
      assert(regex.test(value), `Invalid ${type} encoding`);
    } else {
      for (let i = (ipfsCompat ? 1 : 0); i < value.length; i++) {
        assert(alphabet.includes(value[i]), () => `Invalid ${type} character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
      }
    }

    return true;
  };
}
