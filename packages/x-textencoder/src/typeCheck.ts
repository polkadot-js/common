// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextEncoder as BrowserTE } from './browser';
import { TextEncoder as NodeTE } from './node';

console.log(new BrowserTE().encode('abc'));
console.log(new NodeTE().encode('abc'));
