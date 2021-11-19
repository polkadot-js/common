// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange } from '@polkadot/util';
import { randomAsU8a } from '@polkadot/util-crypto';

const GENERATED = arrayRange(64).map(() => randomAsU8a());

function loop (count: number, onlyJs: boolean, exec: (input: Uint8Array, onlyJs: boolean) => unknown): number {
  const start = Date.now();

  for (let i = 0; i < count; i++) {
    exec(GENERATED[i % GENERATED.length], onlyJs);
  }

  return Date.now() - start;
}

export function performanceTest (name: string, count: number, exec: (input: Uint8Array, onlyJs: boolean) => unknown): void {
  it(`performance: ${name}`, (): void => {
    const ws = loop(count, false, exec);
    const js = loop(count, true, exec);

    console.log(`
performance run for ${name} completed with ${count} iterations.

    WebAssembly: ${ws.toString().padStart(10)}ms ${ws < js ? '(fastest)' : `(slowest, ${(ws / js).toFixed(2)}x)`}
     JavaScript: ${js.toString().padStart(10)}ms ${ws > js ? '(fastest)' : `(slowest, ${(js / ws).toFixed(2)}x)`}
`);
  });
}
