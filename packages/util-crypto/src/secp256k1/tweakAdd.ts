// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert, isU8a } from "@polkadot/util";
import BN from "bn.js";
const EC = require("elliptic").ec;

const ec = new EC("secp256k1");
const ecparams = ec.curve;

const errors = {
  // IMPOSSIBLE_CASE: 'Impossible case. Please create issue.',
  TWEAK_ADD: "The tweak was out of range or the resulted private key is invalid",
  // TWEAK_MUL: 'The tweak was out of range or equal to zero',
  // CONTEXT_RANDOMIZE_UNKNOW: 'Unknow error on context randomization',
  // SECKEY_INVALID: 'Private Key is invalid',
  PUBKEY_PARSE: 'Public Key could not be parsed',
  // PUBKEY_SERIALIZE: 'Public Key serialization error',
  // PUBKEY_COMBINE: 'The sum of the public keys is not valid',
  // SIG_PARSE: 'Signature could not be parsed',
  // SIGN: 'The nonce generation function failed, or the private key was invalid',
  // RECOVER: 'Public key could not be recover',
  // ECDH: 'Scalar was invalid (zero or overflow)'
};

function isUint8Array(name: string, value: Uint8Array, length: number|number[]) {
  assert(isU8a(value), `Expected ${name} to be an Uint8Array`);

  if (length !== undefined) {
    if (Array.isArray(length)) {
      const numbers = length.join(", ");
      const msg = `Expected ${name} to be an Uint8Array with length [${numbers}]`;
      assert(length.includes(value.length), msg);
    } else {
      const msg = `Expected ${name} to be an Uint8Array with length ${length}`;
      assert(value.length === length, msg);
    }
  }
}

// function isCompressed (value:boolean) {
//   assert(toTypeString(value) === 'Boolean', 'Expected compressed to be a Boolean')
// }
// function toTypeString (value:boolean) {
//   return Object.prototype.toString.call(value).slice(8, -1)
// }
// function getAssertedOutput (output = (len:number) => new Uint8Array(len), length:number) {
//   if (typeof output === 'function') output = output(length)
//   isUint8Array('output', output, length)
//   return output
// }


// Private key

export function secp256k1PrivateKeyTweakAdd(seckey: Uint8Array, tweak: Uint8Array) {
  try {
    isUint8Array("private key", seckey, 32);
    isUint8Array("tweak", tweak, 32);
  
    switch (_secp256k1PrivateKeyTweakAdd(seckey, tweak)) {
      case 0:
        return seckey;
      case 1:
        throw new Error(errors.TWEAK_ADD);
    }
  } catch(e){
    throw e
  }
}
function _secp256k1PrivateKeyTweakAdd(seckey: Uint8Array, tweak: Uint8Array) {
  const bn = new BN(tweak);
  if (bn.cmp(ecparams.n) >= 0) return 1;

  bn.iadd(new BN(seckey));
  if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n);
  if (bn.isZero()) return 1;
  //@ts-ignore
  const tweaked = bn.toArrayLike(Uint8Array, "be", 32);
  seckey.set(tweaked);
  return 0;
}

// export function publicKeyTweakAdd (pubkey:Uint8Array, tweak:Uint8Array, compressed:boolean = true, output:Uint8Array) {
//   isUint8Array('public key', pubkey, [33, 65])
//   isUint8Array('tweak', tweak, 32)
//   //isCompressed(compressed)
//   output = new Uint8Array(compressed? 33:65) //getAssertedOutput(output, compressed ? 33 : 65)

//   switch (_publicKeyTweakAdd(output, pubkey, tweak)) {
//     case 0:
//       return output
//     case 1:
//       throw new Error(errors.PUBKEY_PARSE)
//     case 2:
//       throw new Error(errors.TWEAK_ADD)
//   }
// }

// export function _publicKeyTweakAdd (output:Uint8Array, pubkey:Uint8Array, tweak:Uint8Array) {
//   const pair = loadPublicKey(pubkey)
//   if (pair === null) return 1

//   tweak = new BN(tweak)
//   if (tweak.cmp(ecparams.n) >= 0) return 2

//   const point = pair.getPublic().add(ecparams.g.mul(tweak))
//   if (point.isInfinity()) return 2

//   savePublicKey(output, point)

//   return 0
// }
