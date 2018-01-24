// @flow

declare module 'blakejs' {
  declare module.exports: {
    blake2b: (data: Uint8Array, key?: Uint8Array, outlen?: number) => Uint8Array,
    blake2bHex: (data: Uint8Array) => string,

    blake2s: (data: Uint8Array, key?: Uint8Array, outlen?: number) => Uint8Array,
    blake2sHex: (data: Uint8Array) => string
  }
}
