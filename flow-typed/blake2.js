// @flow

declare module 'blake2' {
  declare type Blake2$Options = {
    digestLength: number
  };

  declare type Blake2$Type = 'blake2b' | 'blake2s';

  declare type Blake2$Hash = {
    update: (data: Buffer) => void;
    digest: () => Buffer;
  };

  declare module.exports: {
    createHash: (type: Blake2$Type, options?: Blake2$Options) => Blake2$Hash
  }
}
