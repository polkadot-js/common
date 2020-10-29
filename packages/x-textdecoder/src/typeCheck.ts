// Copyright 2020 @polkadot/x-textdecoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BrowserTD from './browser';
import NodeTD from './node';

console.log(new BrowserTD('utf-8').decode(new Uint8Array([1, 2, 3])));
console.log(new NodeTD('utf-8').decode(new Uint8Array([1, 2, 3])));
