// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert, u8aToU8a } from '@polkadot/util';

// NOTE: Work around a TS issue. These are re-defined like in @polkadot/util/types
// since without it the import
//
//   import type { U8aLike } from '@polkadot/util/types';
//
// ends up in the build-generated code as
//
//   impor("../../../util/src/types").U8aLike
//
// eslint-disable-next-line @typescript-eslint/ban-types
type U8aLike = number[] | Buffer | Uint8Array | string | String;

interface Coder {
  decode: (value: string) => Uint8Array;
  encode: (value: Uint8Array) => string;
}

interface Config {
  alphabet: string;
  coder: Coder;
  ipfsChar?: string;
  regex?: RegExp;
  type: string;
}

type DecodeFn = (value: string, ipfsCompat?: boolean) => Uint8Array;

type EncodeFn = (value: U8aLike, ipfsCompat?: boolean) => string;

type ValidateFn = (value?: unknown, ipfsCompat?: boolean) => value is string;

export function createDecode ({ coder, ipfsChar }: Config, validate: ValidateFn): DecodeFn {
  return (value: string, ipfsCompat?: boolean): Uint8Array => {
    validate(value, ipfsCompat);

    return coder.decode(
      ipfsChar && ipfsCompat
        ? value.substr(1)
        : value
    );
  };
}

export function createEncode ({ coder, ipfsChar }: Config): EncodeFn {
  return (value: U8aLike, ipfsCompat?: boolean): string => {
    const out = coder.encode(u8aToU8a(value));

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

    if (ipfsChar && ipfsCompat) {
      assert(value[0] === ipfsChar, () => `Expected ipfs-compatible ${type} to start with '${ipfsChar}'`);
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
