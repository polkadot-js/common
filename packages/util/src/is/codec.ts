// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { isFunction } from './function';
import { isObject } from './object';

interface Registry {
  get: (...params: unknown[]) => unknown;
}

interface Codec {
  readonly registry: Registry;

  toHex (isLe?: boolean): HexString;
  toU8a: (isBare?: unknown) => Uint8Array;
}

export function isCodec <T extends Codec = Codec> (value?: unknown): value is T {
  return (
    isObject<T>(value) &&
    isFunction(value.toU8a) &&
    isObject<Registry>(value.registry) &&
    isFunction(value.registry.get)
  );
}
