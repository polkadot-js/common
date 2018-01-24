// @flow

declare module 'xxhashjs' {
  declare type xxhashjs$Input = ArrayBuffer | Buffer | string;

  // TODO: This is actuall;y a Uint32 from cuint
  declare type xxhashjs$Result = {
    toNumber: () => number,
    toString: (radix: number) => string
  }

  declare module.exports: {
    h32: (data: xxhashjs$Input, seed: number) => xxhashjs$Result,
    h64: (data: xxhashjs$Input, seed: number) => xxhashjs$Result
  }
}
