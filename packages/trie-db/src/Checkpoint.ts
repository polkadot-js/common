// Copyright 2017-2020 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export default class Checkpoint {
  protected txRoot: Uint8Array;

  protected rootHash: Uint8Array;

  constructor (rootHash: Uint8Array) {
    this.rootHash = rootHash;
    this.txRoot = rootHash;
  }

  protected createCheckpoint (): Uint8Array {
    this.txRoot = this.rootHash;

    return this.txRoot;
  }

  protected commitCheckpoint (): Uint8Array {
    return this.rootHash;
  }

  protected revertCheckpoint (): Uint8Array {
    this.rootHash = this.txRoot;

    return this.rootHash;
  }
}
