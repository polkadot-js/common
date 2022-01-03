// Copyright 2017-2022 @polkadot/x-bundle authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

let crypto = xglobal.crypto;

if (crypto === undefined && typeof require === 'function') {
	crypto = require('crypto').webcrypto;
}

export default crypto;