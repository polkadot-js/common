// Copyright 2017-2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextDecoder as NodeTextDecoder } from 'util';

export const TextDecoder = typeof global.TextDecoder === 'undefined'
  ? NodeTextDecoder as unknown as typeof global.TextDecoder
  : global.TextDecoder;
