// Copyright 2017-2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Fallback from './fallback';

export default typeof TextDecoder === 'undefined'
  ? Fallback as unknown as typeof TextDecoder
  : TextDecoder;
