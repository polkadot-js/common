// Copyright 2017-2023 @polkadot/x-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/LinusU/react-native-get-random-values/blob/85f48393821c23b83b89a8177f56d3a81dc8b733/index.js
// Copyright (c) 2018, 2020 Linus Unnebäck
// SPDX-License-Identifier: MIT

import { NativeModules } from 'react-native';

import { extractGlobal, xglobal } from '@polkadot/x-global';

import { base64Decode } from './base64.js';
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

interface GlobalExt {
  nativeCallSyncHook: unknown;
}

function getRandomValuesNative <T extends Uint8Array> (output: T): T {
  const bytes = base64Decode(
    (NativeModules as RNExt).RNGetRandomValues
      ? (NativeModules as RNExt).RNGetRandomValues.getRandomBase64(output.length)
      : (NativeModules as RNExt).ExpoRandom.getRandomBase64String(output.length)
  );

  for (let i = 0; i < bytes.length; i++) {
    output[i] = bytes[i];
  }

  return output;
}

const getRandomValues = (
  (typeof (xglobal as unknown as GlobalExt).nativeCallSyncHook === 'undefined' || !NativeModules.ExpoRandom)
    ? insecureRandomValues
    : getRandomValuesNative
);

export const crypto = /*#__PURE__*/ extractGlobal('crypto', { getRandomValues });