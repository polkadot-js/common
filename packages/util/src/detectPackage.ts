// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isFunction } from './is/function';
import { isString } from './is/string';
import { assert } from './assert';

// eslint-disable-next-line no-undef
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

type PjsGlobal = NodeJS.Global & PjsChecks;
type PjsWindow = Window & PjsChecks;
type FnString = () => string | undefined;

/** @internal */
function expandPath (path?: string): string {
  return (!path || path.length < 5) ? '<unknown>' : path;
}

/** @internal */
function getMap (): Record<string, VersionPath[]> {
  const _global = typeof window !== 'undefined'
    ? window as PjsWindow
    : global as PjsGlobal;

  if (!_global.__polkadotjs) {
    _global.__polkadotjs = {};
  }

  return _global.__polkadotjs;
}

/** @internal */
function getVersions (name: string): VersionPath[] {
  return (getMap()[name] || []).map((version: VersionPath | string): VersionPath =>
    isString(version)
      ? { version }
      : version
  );
}

/** @internal */
function flattenVersions (name: string): string {
  const all = getVersions(name);
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
export function detectPackage ({ name, version }: PackageJson, pathOrFn?: FnString | string | false): void {
  assert(name.startsWith('@polkadot'), `Invalid package descriptor ${name}`);

  const map = getMap();
  const path = getPath(pathOrFn);

  map[name] = [...(map[name] || []), { path: path || '', version }];

  if (map[name].length !== 1) {
    console.warn(`Multiple instances of ${name} detected, ensure that there is only one package in your dependency tree.\n${flattenVersions(name)}`);
  }
}
