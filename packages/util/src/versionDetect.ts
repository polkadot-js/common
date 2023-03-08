// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

import { isFunction } from './is/function.js';

type This = typeof globalThis;

interface PackageJson {
  name: string;
  path?: string;
  type?: string;
  version: string;
}

interface VersionPath {
  path?: string;
  type?: string;
  version: string;
}

interface PjsChecks extends This {
  __polkadotjs: Record<string, VersionPath[]>;
}

type PjsGlobal = This & PjsChecks & Record<string, unknown>;
type FnString = () => string | undefined;

const DEDUPE = 'Either remove and explicitly install matching versions or dedupe using your package manager.\nThe following conflicting packages were found:';

/** @internal */
function getEntry (name: string): VersionPath[] {
  const _global = xglobal as PjsGlobal;

  if (!_global.__polkadotjs) {
    _global.__polkadotjs = {};
  }

  if (!_global.__polkadotjs[name]) {
    _global.__polkadotjs[name] = [];
  }

  return _global.__polkadotjs[name];
}

/** @internal */
function formatDisplay <T extends { version: string }> (all: T[], fmt: (version: string, data: T) => string[]): string {
  let max = 0;

  for (let i = 0; i < all.length; i++) {
    max = Math.max(max, all[i].version.length);
  }

  return all
    .map((d) => `\t${fmt(d.version.padEnd(max), d).join('\t')}`)
    .join('\n');
}

/** @internal */
function formatInfo (version: string, { name }: PackageJson): string[] {
  return [
    version,
    name
  ];
}

/** @internal */
function formatVersion (version: string, { path, type }: VersionPath): string[] {
  let extracted: string;

  if (path && path.length >= 5) {
    const nmIndex = path.indexOf('node_modules');

    extracted = nmIndex === -1
      ? path
      : path.substring(nmIndex);
  } else {
    extracted = '<unknown>';
  }

  return [
    `${`${type || ''}`.padStart(3)} ${version}`,
    extracted
  ];
}

/** @internal */
function getPath (infoPath?: string, pathOrFn?: FnString | string | false | null): string {
  if (infoPath) {
    return infoPath;
  } else if (isFunction(pathOrFn)) {
    try {
      return pathOrFn() || '';
    } catch (error) {
      return '';
    }
  }

  return pathOrFn || '';
}

/** @internal */
function warn <T extends { version: string }> (pre: string, all: T[], fmt: (version: string, data: T) => string[]): void {
  console.warn(`${pre}\n${DEDUPE}\n${formatDisplay(all, fmt)}`);
}

/**
 * @name detectPackage
 * @summary Checks that a specific package is only imported once
 * @description A `@polkadot/*` version detection utility, checking for one occurence of a package in addition to checking for ddependency versions.
 */
export function detectPackage ({ name, path, type, version }: PackageJson, pathOrFn?: FnString | string | false | null, deps: PackageJson[] = []): void {
  if (!name.startsWith('@polkadot')) {
    throw new Error(`Invalid package descriptor ${name}`);
  }

  const entry = getEntry(name);

  entry.push({ path: getPath(path, pathOrFn), type, version });

  if (entry.length !== 1) {
    warn(`${name} has multiple versions, ensure that there is only one installed.`, entry, formatVersion);
  } else {
    const mismatches = deps.filter((d) => d && d.version !== version);

    if (mismatches.length) {
      warn(`${name} requires direct dependencies exactly matching version ${version}.`, mismatches, formatInfo);
    }
  }
}
