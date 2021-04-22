// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

import { isFunction } from './is/function';
import { isString } from './is/string';
import { assert } from './assert';

type This = typeof globalThis;

interface PackageJson {
  name: string;
  version: string;
}

interface VersionPath {
  path?: string;
  version: string;
}

interface PjsChecks extends This {
  __polkadotjs: Record<string, VersionPath[]>;
}

type PjsWindow = (Window & This) & PjsChecks;
type FnString = () => string | undefined;

const DEDUPE = 'Either remove and explicitly install matching versions or dedupe using your package manager.\nThe following conflicting packages were found:';

/** @internal */
function getEntry (name: string): VersionPath[] {
  const _global = xglobal as PjsWindow;

  if (!_global.__polkadotjs) {
    _global.__polkadotjs = {};
  }

  if (!_global.__polkadotjs[name]) {
    _global.__polkadotjs[name] = [];
  }

  return _global.__polkadotjs[name];
}

function getVersionLength (all: { version: string }[]): number {
  return all.reduce((max, { version }) => Math.max(max, version.length), 0);
}

/** @internal */
function flattenInfos (all: PackageJson[]): string {
  const verLength = getVersionLength(all);

  return all
    .map(({ name, version }) => `\t${version.padEnd(verLength)}\t${name}`)
    .join('\n');
}

/** @internal */
function flattenVersions (entry: VersionPath[]): string {
  const all = entry.map((version: VersionPath | string): VersionPath =>
    isString(version)
      ? { version }
      : version
  );
  const verLength = getVersionLength(all);

  return all
    .map(({ path, version }) => `\t${version.padEnd(verLength)}\t${(!path || path.length < 5) ? '<unknown>' : path}`)
    .join('\n');
}

/** @internal */
function getPath (pathOrFn?: FnString | string | false): string {
  if (isFunction(pathOrFn)) {
    try {
      return pathOrFn() || '';
    } catch (error) {
      return '';
    }
  }

  return pathOrFn || '';
}

/**
 * @name detectPackage
 * @summary Checks that a specific package is only imported once
 */
export function detectPackage ({ name, version }: PackageJson, pathOrFn?: FnString | string | false, deps: PackageJson[] = []): void {
  assert(name.startsWith('@polkadot'), () => `Invalid package descriptor ${name}`);

  const entry = getEntry(name);

  entry.push({ path: getPath(pathOrFn), version });

  if (entry.length !== 1) {
    console.warn(`${name} has multiple versions, ensure that there is only one installed.\n${DEDUPE}\n${flattenVersions(entry)}`);
  } else {
    const mismatches = deps.filter((d) => d && d.version !== version);

    if (mismatches.length) {
      console.warn(`${name} requires direct dependencies exactly matching version ${version}.\n${DEDUPE}\n${flattenInfos(mismatches)}`);
    }
  }
}
