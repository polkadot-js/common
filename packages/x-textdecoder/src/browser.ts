// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

import { TextDecoder as Fallback } from './fallback';

export { packageInfo } from './packageInfo';

export const TextDecoder = (
  typeof xglobal.TextDecoder === 'undefined'
    ? Fallback as unknown as typeof xglobal.TextDecoder
    : xglobal.TextDecoder
);
