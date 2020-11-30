// Copyright 2017-2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Fallback from './fallback';

export default typeof TextEncoder === 'undefined'
  ? Fallback as unknown as typeof TextEncoder
  : TextEncoder;
