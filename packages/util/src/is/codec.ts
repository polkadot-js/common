// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types.js';

import { isOnObject } from './helpers.js';

interface Registry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (...params: never[]) => any;
}

interface Codec {
  readonly registry: Registry;

  toHex (...params: never[]): HexString;
  toHuman (...params: never[]): unknown;
  toU8a: (...params: never[]) => Uint8Array;
}

const checkCodec = /*#__PURE__*/ isOnObject<Codec>('toHex', 'toHuman', 'toU8a');
const checkRegistry = /*#__PURE__*/ isOnObject<Registry>('get');

export function isCodec <T extends Codec = Codec> (value?: unknown): value is T {
  return checkCodec(value) && checkRegistry(value.registry);
}
