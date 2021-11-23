// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { formatDecimal, formatNumber } from '@polkadot/util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExecFn = (...params: any[]) => unknown;

function loop (count: number, inputs: unknown[][], exec: ExecFn): number {
  const start = Date.now();

  for (let i = 0; i < count; i++) {
    exec(...inputs[i % inputs.length]);
  }

  return Date.now() - start;
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

export function performanceJs (name: string, count: number, inputs: unknown[][], exec: ExecFn): void {
  it(`performance: ${name}`, (): void => {
    const time = loop(count, inputs, exec);

    console.log(`
performance run for ${name} completed with ${formatNumber(count)} iterations.

${'JavaScript:'.padStart(19)} ${time.toString().padStart(15)} ms${formatOps(count, time)}
`);
  });
}
