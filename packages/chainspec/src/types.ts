// Copyright 2017-2019 @polkadot/chainspec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export type Telemetry = [string, number];

export interface Chainspec {
  bootNodes: string[];
  id: string;
  genesis: {
    raw: {
      [index: string]: string;
    };
  };
  genesisRoot?: string;
  name: string;
  properties: null | {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: any;
  };
  protocolId: string | null;
  telemetryUrl?: string | null;
  telemetryEndpoints?: Telemetry[];
}
