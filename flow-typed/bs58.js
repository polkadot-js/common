// @flow

declare module 'bs58' {
  declare module.exports: {
    decode: (input: string) => Buffer,
    encode: (input: Buffer | Array<number>) => string
  }
}
