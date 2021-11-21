// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange, formatDecimal } from '@polkadot/util';
import { randomAsU8a } from '@polkadot/util-crypto';

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

function formatFixed (value: number): string {
  const [a, b] = value.toFixed(2).split('.');

  return [formatDecimal(a), b].join('.');
}

function perSecond (count: number, time: number): string {
  const micro = (time * 1000) / count;
  const ops = 1_000_000 / micro;

  return `
                 ${formatFixed(ops).padStart(15)} ops/s
                 ${formatFixed(micro).padStart(15)} μs/op`;
}

export function performanceTest (name: string, count: number, exec: ExecFn): void {
  it(`performance: ${name}`, (): void => {
    const [ws, rws] = loop(count, false, exec);
    const [js, rjs] = loop(count, true, exec);

    console.log(`
performance run for ${name} completed with ${count} iterations.

    WebAssembly: ${ws.toString().padStart(15)} ms ${ws < js ? '(fastest)' : `(slowest, ${(ws / js).toFixed(2)}x)`}${perSecond(count, ws)}

     JavaScript: ${js.toString().padStart(15)} ms ${ws > js ? '(fastest)' : `(slowest, ${(js / ws).toFixed(2)}x)`}${perSecond(count, js)}
`);

    const unmatched = rws.filter((r, i) =>
      JSON.stringify(rjs[i]) !== JSON.stringify(r)
    );

    expect(unmatched.length).toEqual(0);
  });
}
