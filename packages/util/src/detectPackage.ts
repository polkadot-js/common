// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

import { isFunction } from './is/function.js';

type This = typeof globalThis;

interface VersionPath {
  path: string;
  type: string;
  version: string;
}

interface PackageInfo extends VersionPath {
  name: string;
}

interface PjsChecks extends This {
  __polkadotjs: Record<string, VersionPath[]>;
}

type PjsGlobal = This & PjsChecks & Record<string, unknown>;
type FnString = () => string | undefined;

const DEDUPE = 'Either remove and explicitly install matching versions or dedupe using your package manager.\nThe following conflicting packages were found:';

export const POLKADOTJS_DISABLE_ESM_CJS_WARNING_FLAG = 'POLKADOTJS_DISABLE_ESM_CJS_WARNING';

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

  for (let i = 0, count = all.length; i < count; i++) {
    max = Math.max(max, all[i].version.length);
  }

  return all
    .map((d) => `\t${fmt(d.version.padEnd(max), d).join('\t')}`)
    .join('\n');
}

/** @internal */
function formatInfo (version: string, { name }: PackageInfo): string[] {
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
    } catch {
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
 * @description A `@polkadot/*` version detection utility, checking for one occurrence of a package in addition to checking for dependency versions.
 */
export function detectPackage ({ name, path, type, version }: PackageInfo, pathOrFn?: FnString | string | false | null, deps: PackageInfo[] = []): void {
  if (!name.startsWith('@polkadot')) {
    throw new Error(`Invalid package descriptor ${name}`);
  }

  const entry = getEntry(name);

  entry.push({ path: getPath(path, pathOrFn), type, version });

  // if we have more than one entry at DIFFERENT version types then warn. If there is
  // more than one entry at the same version and ESM/CJS dual warnings are disabled,
  // then do not display warnings
  const entriesSameVersion = entry.every((e) => e.version === version);
  const esmCjsWarningDisabled = xglobal.process?.env?.[POLKADOTJS_DISABLE_ESM_CJS_WARNING_FLAG] === '1';
  const multipleEntries = entry.length !== 1;
  const disableWarnings = esmCjsWarningDisabled && entriesSameVersion;

  if (multipleEntries && !disableWarnings) {
    warn(`${name} has multiple versions, ensure that there is only one installed.`, entry, formatVersion);
  } else {
    const mismatches = deps.filter((d) => d && d.version !== version);

    if (mismatches.length) {
      warn(`${name} requires direct dependencies exactly matching version ${version}.`, mismatches, formatInfo);
    }
  }
}
