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

/** @internal */
function expandPath (path?: string): string {
  return (!path || path.length < 5) ? '<unknown>' : path;
}

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

/** @internal */
function flattenInfos (all: PackageJson[]): string {
  const verLength = all.reduce((max, { version }) => Math.max(max, version.length), 0);

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
  const verLength = all.reduce((max, { version }) => Math.max(max, version.length), 0);

  return all
    .map(({ path, version }) => `\t${version.padEnd(verLength)}\t${expandPath(path)}`)
    .join('\n');
}

/** @internal */
function getPath (pathOrFn?: FnString | string | false): false | string | undefined {
  if (isFunction(pathOrFn)) {
    try {
      return pathOrFn();
    } catch (error) {
      return undefined;
    }
  }

  return pathOrFn;
}

/**
 * @name detectPackage
 * @summary Checks that a specific package is only imported once
 */
export function detectPackage (info: PackageJson, pathOrFn?: FnString | string | false, deps: PackageJson[] = []): void {
  assert(info.name.startsWith('@polkadot'), `Invalid package descriptor ${info.name}`);

  const entry = getEntry(info.name);

  entry.push({ path: getPath(pathOrFn) || '', version: info.version });

  if (entry.length !== 1) {
    console.warn(`${info.name} has multiple versions, ensure that there is only one package in your dependency tree. The following were found:\n${flattenVersions(entry)}`);
  }

  const mismatches = deps.filter((d) => !!d).filter(({ version }) => info.version !== version);

  if (mismatches.length) {
    console.warn(`${info.name} requires direct dependencies matching version ${info.version}. The following mismatches were found:\n${flattenInfos(mismatches)}`);
  }
}
