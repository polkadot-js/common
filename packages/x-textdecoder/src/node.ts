// Copyright 2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextDecoder as NodeTextDecoder } from 'util';

export default typeof TextDecoder === 'undefined'
  ? NodeTextDecoder
  : TextDecoder;
