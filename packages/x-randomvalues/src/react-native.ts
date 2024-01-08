// Copyright 2017-2024 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/LinusU/react-native-get-random-values/blob/85f48393821c23b83b89a8177f56d3a81dc8b733/index.js
//
// Copyright (c) 2018, 2020 Linus Unnebäck
// SPDX-License-Identifier: MIT

import { NativeModules } from 'react-native';

import { base64Decode } from '@polkadot/wasm-util/base64';
import { xglobal } from '@polkadot/x-global';

import { crypto as cryptoBrowser, getRandomValues as getRandomValuesBrowser } from './browser.js';
import { insecureRandomValues } from './fallback.js';

export { packageInfo } from './packageInfo.js';

interface RNExt {
  ExpoRandom: {
    getRandomBase64String: (length: number) => string;
  };
  RNGetRandomValues: {
    getRandomBase64: (length: number) => string;
  }
}

/**
 * @internal
 *
 * A getRandomValues util that detects and uses the available RN
 * random utiliy generation functions.
 **/
function getRandomValuesRn (output: Uint8Array): Uint8Array {
  return base64Decode(
    (NativeModules as RNExt).RNGetRandomValues
      ? (NativeModules as RNExt).RNGetRandomValues.getRandomBase64(output.length)
      : (NativeModules as RNExt).ExpoRandom.getRandomBase64String(output.length),
    output
  );
}

export const getRandomValues = (
  (typeof xglobal.crypto === 'object' && typeof xglobal.crypto.getRandomValues === 'function')
    ? getRandomValuesBrowser
    : (typeof xglobal['nativeCallSyncHook'] === 'undefined' || !NativeModules['ExpoRandom'])
      ? insecureRandomValues
      : getRandomValuesRn
);

export const crypto = (
  getRandomValues === getRandomValuesBrowser
    ? cryptoBrowser
    : { getRandomValues }
);
