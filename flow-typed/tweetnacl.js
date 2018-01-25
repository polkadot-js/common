// @flow

declare module 'tweetnacl' {
  declare module.exports: {
    hash: (data: Uint8Array) => Uint8Array,
    randomBytes: (length: number) => Uint8Array
  }
}
