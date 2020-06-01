// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import assert from './assert';
import isString from './is/string';

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

function expandPath (path?: string): string {
  return (!path || path.length < 5) ? '<unknown>' : path;
}

/** @internal */
function flattenVersions (_all: (VersionPath | string)[]): string {
  const all: VersionPath[] = _all.map((version: VersionPath | string): VersionPath =>
    isString(version)
      ? { version }
      : version
  );
  const verLength = all.reduce((max, { version }): number => Math.max(max, version.length), 0);

  return all
    .map(({ path, version }) => `\t${version.padEnd(verLength)}\t${expandPath(path)}`)
    .join('\n');
}

/**
 * @name detectPackage
 * @summary Checks that a specific package is only imported once
 */
export default function detectPackage ({ name, version }: PackageJson, path?: string | false): void {
  const _global = typeof window !== 'undefined'
    ? window as PjsWindow
    : global as PjsGlobal;

  if (!_global.__polkadotjs) {
    _global.__polkadotjs = {};
  }

  assert(name.startsWith('@polkadot'), `Invalid package descriptor ${name}`);

  _global.__polkadotjs[name] = [...(_global.__polkadotjs[name] || []), { path: path || '', version }];

  if (_global.__polkadotjs[name].length !== 1) {
    const versions = flattenVersions(_global.__polkadotjs[name]);

    console.warn(`Multiple instances of ${name} detected, ensure that there is only one package in your dependency tree.\n${versions}`);
  }
}
