// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { formatDecimal, formatNumber } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExecFn = (...params: any[]) => unknown;

function loop (count: number, inputs: unknown[][], exec: ExecFn): [number, unknown[]] {
  const start = Date.now();
  const results = new Array<unknown>(inputs.length);

  for (let i = 0; i < count; i++) {
    const result = exec(...inputs[i % inputs.length]);

    if (i < inputs.length) {
      results[i] = result;
    }
  }

  return [Date.now() - start, results];
}

export function formatFixed (value: number): string {
  const [a, b] = value.toFixed(2).split('.');

  return [formatDecimal(a), b].join('.');
}

export function formatOps (count: number, time: number): string {
  const micro = (time * 1000) / count;
  const ops = 1_000_000 / micro;

  return `
${formatFixed(ops).padStart(15 + 20)} ops/s
${formatFixed(micro).padStart(15 + 20)} μs/op`;
}

export function performance (name: string, count: number, inputs: unknown[][], exec: ExecFn): void {
  it(`performance: ${name}`, (): void => {
    const [time] = loop(count, inputs, exec);

    console.log(`
performance run for ${name} completed with ${formatNumber(count)} iterations.

${`${name}:`.padStart(19)} ${time.toString().padStart(15)} ms${formatOps(count, time)}
`);
  });
}

export function performanceCmp (name: string, [first, second]: [string, string], count: number, inputs: unknown[][], exec: ExecFn): void {
  it(`performance: ${name}`, (): void => {
    const pa = inputs.map((values) => [...values, false]);
    const pb = inputs.map((values) => [...values, true]);
    const [ta, ra] = loop(count, pa, exec);
    const [tb, rb] = loop(count, pb, exec);

    console.log(`
performance run for ${name} completed with ${formatNumber(count)} iterations.

${`${first}:`.padStart(19)} ${ta.toString().padStart(15)} ms ${ta < tb ? '(fastest)' : `(slowest, ${(ta / tb).toFixed(2)}x)`}${formatOps(count, ta)}

${`${second}:`.padStart(19)} ${tb.toString().padStart(15)} ms ${ta > tb ? '(fastest)' : `(slowest, ${(tb / ta).toFixed(2)}x)`}${formatOps(count, tb)}
`);

    const unmatched = ra.filter((r, i) =>
      JSON.stringify(r) !== JSON.stringify(rb[i])
    );

    expect(unmatched.length).toEqual(0);
  });
}
