// Copyright 2017-2021 @polkadot/x-textdecoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextDecoder as BrowserTD } from './browser';
import { TextDecoder as NodeTD } from './node';

console.log(new BrowserTD('utf-8').decode(new Uint8Array([1, 2, 3])));
console.log(new NodeTD('utf-8').decode(new Uint8Array([1, 2, 3])));
