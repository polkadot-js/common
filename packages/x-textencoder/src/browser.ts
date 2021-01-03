// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextEncoder as Fallback } from './fallback';

export const TextEncoder = typeof global.TextEncoder === 'undefined'
  ? Fallback as unknown as typeof global.TextEncoder
  : global.TextEncoder;
