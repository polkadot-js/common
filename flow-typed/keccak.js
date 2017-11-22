// ISC, Copyright 2017 Jaco Greeff
// @flow

type KeccakType = 'keccak256';

declare module 'keccak' {
  declare module.exports: (type: KeccakType) => {
    update: (value: Buffer | string) => {
      digest: () => Buffer;
    }
  };
}
