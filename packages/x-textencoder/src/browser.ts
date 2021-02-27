// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

import { TextEncoder as Fallback } from './fallback';

export { packageInfo } from './packageInfo';

export const TextEncoder = (
  typeof xglobal.TextEncoder === 'undefined'
    ? Fallback as unknown as typeof xglobal.TextEncoder
    : xglobal.TextEncoder
);
