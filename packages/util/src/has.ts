// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

export const hasBigInt = typeof xglobal.BigInt === 'function' && typeof xglobal.BigInt.asIntN === 'function';
export const hasBuffer = typeof Buffer !== 'undefined';
export const hasDirname = typeof __dirname !== 'undefined';
export const hasProcess = typeof process === 'object';
export const hasWasm = typeof WebAssembly !== 'undefined';
