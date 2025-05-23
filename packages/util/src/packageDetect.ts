// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Do not edit, auto-generated by @polkadot/dev
// (packageInfo imports will be kept as-is, user-editable)

import { packageInfo as decoderInfo } from '@polkadot/x-textdecoder';
import { packageInfo as encoderInfo } from '@polkadot/x-textencoder';

import { detectPackage } from './detectPackage.js';
import { packageInfo } from './packageInfo.js';

detectPackage(packageInfo, null, [decoderInfo, encoderInfo]);
