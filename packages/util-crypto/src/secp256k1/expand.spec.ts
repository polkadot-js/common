// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { perfWasm } from '../test/index.js';
import { secp256k1Expand } from './index.js';

describe('secp256k1Expand', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('expands a known key', (): void => {
        expect(
          secp256k1Expand(
            hexToU8a('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb13077'),
            onlyJs
          )
        ).toEqual(
          hexToU8a('0xb9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb1307763fe926c273235fd979a134076d00fd1683cbd35868cb485d4a3a640e52184af')
        );
      });

      it('expands a known full key', (): void => {
        expect(
          secp256k1Expand(
            hexToU8a('0x04b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb1307763fe926c273235fd979a134076d00fd1683cbd35868cb485d4a3a640e52184af'),
            onlyJs
          )
        ).toEqual(
          hexToU8a('0xb9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb1307763fe926c273235fd979a134076d00fd1683cbd35868cb485d4a3a640e52184af')
        );
      });
    });
  }

  perfWasm('secp256k1Expand', 2000, (input, onlyJs) => secp256k1Expand(input, onlyJs), [[
    hexToU8a('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb13077')
  ]]
  );
});
