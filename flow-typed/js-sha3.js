// @flow

// TODO: This is not comprehensive, rather only what is (currently) used
declare module 'js-sha3' {
  declare type JSSha3$Interface = {
    arrayBuffer: (data: ArrayBuffer | Buffer | Uint8Array | string) => ArrayBuffer
  };

  declare module.exports: {
    keccak256: JSSha3$Interface
  }
}
