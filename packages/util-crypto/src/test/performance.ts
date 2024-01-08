// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange } from '@polkadot/util';
import { perf, perfCmp } from '@polkadot/util/test';

import { randomAsU8a } from '../index.js';

type ExecFn = (input: Uint8Array, onlyJs: boolean) => unknown;

const GENERATED = arrayRange(256).map(() => [randomAsU8a()]);

export function perfWasm (name: string, count: number, exec: ExecFn, inputs = GENERATED): void {
  perfCmp(name, ['WebAssembly', 'JavaScript'], count, inputs, exec);
}

export { perf, perfCmp };
