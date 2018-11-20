// Copyright 2017-2018 @polkadot/chainspec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export type Chainspec = {
  bootNodes: Array<string>,
  id: string,
  genesis: {
    raw: {
      [index: string]: string
    }
  },
  genesisRoot: string,
  name: string,
  properties: {
    [index: string]: string
  },
  protocolId: null,
  telemetryUrl: string,
};
