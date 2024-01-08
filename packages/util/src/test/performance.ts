// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

/* global it, expect */

import { formatDecimal, formatNumber, stringify } from '../index.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExecFn = (...params: any[]) => unknown;

const NUM_PAD = 16;
const PRE_PAD = 32;

function loop (exec: ExecFn, count: number, inputs: readonly unknown[][]): [number, unknown[]] {
  const start = performance.now();
  const results = new Array<unknown>(inputs.length);

  for (let i = 0; i < count; i++) {
    const result = exec(...inputs[i % inputs.length]);

    if (i < inputs.length) {
      results[i] = result;
    }
  }

  return [performance.now() - start, results];
}

export function formatFixed (value: number): string {
  const [a, b] = value.toFixed(2).split('.');

  return [formatDecimal(a), b].join('.');
}

export function formatOps (count: number, time: number): string {
  const micro = (time * 1000) / count;
  const ops = 1_000_000 / micro;

  return `
${formatFixed(ops).padStart(NUM_PAD + PRE_PAD + 1)} ops/s
${formatFixed(micro).padStart(NUM_PAD + PRE_PAD + 1)} μs/op`;
}

export function perf (name: string, count: number, inputs: readonly unknown[][], exec: ExecFn, withLog?: boolean): void {
  const test = process.env['GITHUB_REPOSITORY']
    ? it.skip
    : it;

  test(`performance: ${name}`, (): void => {
    const [time, results] = loop(exec, count, inputs);

    console.error(`
performance run for ${name} completed with ${formatNumber(count)} iterations.

${`${name}:`.padStart(PRE_PAD)} ${time.toFixed(2).padStart(NUM_PAD)} ms${formatOps(count, time)}
`);

    if (withLog) {
      console.log(results);
    }
  });
}

export function perfCmp (name: string, [first, second]: [string, string], count: number, inputs: readonly unknown[][], exec: ExecFn): void {
  const test = process.env['GITHUB_REPOSITORY']
    ? it.skip
    : it;

  test(`performance: ${name}`, (): void => {
    const [[t1, r1], [t2, r2]] = [false, true].map((flag) =>
      loop(exec, count, inputs.map((values) =>
        [...values, flag]
      ))
    );

    console.error(`
performance run for ${name} completed with ${formatNumber(count)} iterations.

${`${first}:`.padStart(PRE_PAD)} ${t1.toFixed(2).padStart(NUM_PAD)} ms ${t1 < t2 ? '(fastest)' : `(slowest, ${(t1 / t2).toFixed(2)}x)`}${formatOps(count, t1)}

${`${second}:`.padStart(PRE_PAD)} ${t2.toFixed(2).padStart(NUM_PAD)} ms ${t1 > t2 ? '(fastest)' : `(slowest, ${(t2 / t1).toFixed(2)}x)`}${formatOps(count, t2)}
`);

    expect(
      r1.filter((_, i) =>
        stringify(r1[i]) !== stringify(r2[i])
      )
    ).toHaveLength(0);
  });
}
