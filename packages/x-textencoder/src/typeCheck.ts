// Copyright 2020 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BrowserTE from './browser';
import NodeTE from './node';

console.log(new BrowserTE().encode('abc'));
console.log(new NodeTE().encode('abc'));
