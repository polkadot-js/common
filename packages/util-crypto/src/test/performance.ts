// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange } from '@polkadot/util';
import { performance, performanceCmp } from '@polkadot/util/test/performance';

import { randomAsU8a } from '..';

type ExecFn = (input: Uint8Array, onlyJs: boolean) => unknown;

const GENERATED = arrayRange(256).map(() => [randomAsU8a()]);

export function performanceWasm (name: string, count: number, exec: ExecFn, inputs = GENERATED): void {
  performanceCmp(name, ['WebAssembly', 'JavaScript'], count, inputs, exec);
}

export { performance, performanceCmp };
