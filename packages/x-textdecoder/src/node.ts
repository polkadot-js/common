// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import util from 'util';

export const TextDecoder = typeof global.TextDecoder === 'undefined'
  ? util.TextDecoder as unknown as typeof global.TextDecoder
  : global.TextDecoder;
