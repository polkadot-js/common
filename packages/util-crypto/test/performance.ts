// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange } from '@polkadot/util';
import { randomAsU8a } from '@polkadot/util-crypto';

import { formatOps, performanceJs } from '../../util/test/performance';

type ExecFn = (input: Uint8Array, onlyJs: boolean) => unknown;

const GENERATED = arrayRange(256).map(() => randomAsU8a());

function loop (count: number, onlyJs: boolean, exec: ExecFn): [number, unknown[]] {
  const start = Date.now();
  const results = new Array<unknown>(GENERATED.length);

  for (let i = 0; i < count; i++) {
    const result = exec(GENERATED[i % GENERATED.length], onlyJs);

    if (i < GENERATED.length) {
      results[i] = result;
    }
  }

  return [Date.now() - start, results];
}

export function performanceWasm (name: string, count: number, exec: ExecFn): void {
  it(`performance: ${name}`, (): void => {
    const [ws, rws] = loop(count, false, exec);
    const [js, rjs] = loop(count, true, exec);

    console.log(`
performance run for ${name} completed with ${count} iterations.

${'WebAssembly:'.padStart(19)} ${ws.toString().padStart(15)} ms ${ws < js ? '(fastest)' : `(slowest, ${(ws / js).toFixed(2)}x)`}${formatOps(count, ws)}

${'JavaScript:'.padStart(19)} ${js.toString().padStart(15)} ms ${ws > js ? '(fastest)' : `(slowest, ${(js / ws).toFixed(2)}x)`}${formatOps(count, js)}
`);

    const unmatched = rws.filter((r, i) =>
      JSON.stringify(rjs[i]) !== JSON.stringify(r)
    );

    expect(unmatched.length).toEqual(0);
  });
}

export { performanceJs };
