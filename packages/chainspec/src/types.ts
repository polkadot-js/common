// Copyright 2017-2020 @polkadot/chainspec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export type Telemetry = [string, number];

export interface Chainspec {
  bootNodes: string[];
  id: string;
  genesis: {
    raw: Record<string, string>;
  };
  genesisRoot?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: null | Record<string, any>;
  protocolId: string | null;
  telemetryUrl?: string | null;
  telemetryEndpoints?: Telemetry[];
}
