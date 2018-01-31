// @flow

declare module 'tweetnacl' {
  declare type Tweetnacl$KeypairType = {
    publicKey: Uint8Array,
    secretKey: Uint8Array
  };

  declare type Tweetnacl$Hash = {
    (message: Uint8Array): Uint8Array,

    hashLength: number
  };

  declare type Tweetnacl$Sign$Detached = {
    (message: Uint8Array, secretKey: Uint8Array): Uint8Array,

    verify: (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array) => boolean
  };

  declare type Tweetnacl$Sign$Keypair = {
    (): Tweetnacl$KeypairType,

    fromSecretKey: (secretKey: Uint8Array) => Tweetnacl$KeypairType,
    fromSeed: (seed: Uint8Array) => Tweetnacl$KeypairType,
  };

  declare type Tweetnacl$Sign = {
    (message: Uint8Array, secretKey: Uint8Array): Uint8Array,
    detached: Tweetnacl$Sign$Detached,

    open: (signedMsg: Uint8Array, publicKey: Uint8Array) => Uint8Array,
    keyPair: Tweetnacl$Sign$Keypair,

    publicKeyLength: number,
    secretKeyLength: number,
    seedLength: number,
    signatureLength: number,
  };

  declare module.exports: {
    randomBytes: (length: number) => Uint8Array,
    hash: Tweetnacl$Hash,
    sign: Tweetnacl$Sign
  }
}
