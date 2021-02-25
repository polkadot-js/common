// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hash from 'hash.js';

import { assert, bnToU8a, bufferToU8a, stringToU8a, u8aConcat, u8aToBn } from '@polkadot/util';

import { secp256k1KeypairFromSeed, secp256k1PrivateKeyTweakAdd } from '../..';
import { hmacSha512 } from '../../hmac';

const MASTER_SECRET = stringToU8a('Bitcoin seed');
const HARDENED_OFFSET = 0x80000000;
// Bitcoin hardcoded by default, can use package `coininfo` for others
const BITCOIN_VERSIONS = { private: 0x0488ADE4, public: 0x0488B21E };

interface Versions {
  private: number;
  public: number;
}

export class HDKeyEth {
  versions: Versions;
  public depth: number;
  index: number;
  public chainCode: Uint8Array | null;
  parentFingerprint: number | null;

  #fingerprint: number | null;
  #identifier: Uint8Array | null;
  #privateKey: Uint8Array | null;
  #publicKey: Uint8Array | null;

  constructor (versions?: Versions) {
    this.versions = versions || BITCOIN_VERSIONS;
    this.depth = 0;
    this.index = 0;
    this.#privateKey = null;
    this.#publicKey = null;
    this.#identifier = null;
    this.chainCode = null;
    this.#fingerprint = null;
    this.parentFingerprint = 0;
  }

  // private key
  set privateKey (value: Uint8Array | null) {
    assert(value && value.length === 32, 'Private key must be 32 bytes.');
    // TODO: implement privateKeyVerify for local secp256k1
    // assert(secp256k1.privateKeyVerify(value) === true, 'Invalid private key');

    this.#privateKey = value;

    if (value) {
      this.#publicKey = secp256k1KeypairFromSeed(value).publicKey;
      this.#identifier = this.#publicKey ? this.hash160(this.#publicKey) : null;
      this.#fingerprint = this.#identifier
        ? u8aToBn(this.#identifier.slice(0, 4), { isLe: false }).toNumber()
        : null;
    }
  }

  get privateKey (): Uint8Array | null {
    return this.#privateKey;
  }

  // public key

  get publicKey (): Uint8Array | null {
    return this.#publicKey;
  }

  set publicKey (value: Uint8Array | null) {
    assert(value && (value.length === 33 || value.length === 65), 'Public key must be 33 or 65 bytes.');
    // TODO: implement publicKeyVerify for local secp256k1
    // assert(secp256k1.publicKeyVerify(value) === true, 'Invalid public key');

    // TODO: should I use the compress function here?
    this.#publicKey = value; // new Uint8Array(Buffer.from(secp256k1.publicKeyConvert(value, true))); // force compressed point
    this.#identifier = this.#publicKey
      ? this.hash160(this.#publicKey)
      : null;
    this.#fingerprint = this.#identifier
      ? u8aToBn(this.#identifier.slice(0, 4), { isLe: false }).toNumber()
      : null;
    this.#privateKey = null;
  }

  // fingerprint
  get fingerprint (): number | null {
    return this.#fingerprint;
  }

  // identifier
  get identifier (): Uint8Array | null {
    return this.#identifier;
  }

  // fingerprint
  get pubKeyHash (): Uint8Array | null {
    return this.identifier;
  }

  // derive
  public derive (path: string): HDKeyEth {
    if (path === 'm' || path === 'M' || path === "m'" || path === "M'") {
      return this;
    }

    const entries = path.split('/');
    let hdkey = this as HDKeyEth;

    entries.forEach(function (c, i) {
      if (i === 0) {
        assert(/^[mM]{1}/.test(c), 'Path must start with "m" or "M"');

        return;
      }

      const hardened = (c.length > 1) && (c[c.length - 1] === "'");
      let childIndex = parseInt(c, 10); // & (HARDENED_OFFSET - 1)

      assert(childIndex < HARDENED_OFFSET, 'Invalid index');

      if (hardened) {
        childIndex += HARDENED_OFFSET;
      }

      hdkey = hdkey.deriveChild(childIndex);
    });

    return hdkey;
  }

  // deriveChild
  private deriveChild (index: number): HDKeyEth {
    const isHardened = index >= HARDENED_OFFSET;
    const indexBuffer = bnToU8a(index, { bitLength: 32, isLe: false });

    let data: Uint8Array;

    if (isHardened) { // Hardened child
      assert(this.privateKey, 'Could not derive hardened child key without private key');

      // data = 0x00 || ser256(kpar) || ser32(index)
      data = u8aConcat(new Uint8Array(1), this.privateKey, indexBuffer);
    } else { // Normal child
      // data = serP(point(kpar)) || ser32(index)
      //      = serP(Kpar) || ser32(index)
      assert(this.publicKey, 'Could not derive hardened child key : no publicKey');

      data = u8aConcat(this.publicKey, indexBuffer);
    }

    assert(this.chainCode, 'deriveChild error: no chainCode');
    assert(this.privateKey, 'PublicKey derivation without private key is not supported');

    const I = hmacSha512(this.chainCode, data);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    const hd = new HDKeyEth(this.versions);

    // Private parent key -> private child key
    try {
      hd.privateKey = secp256k1PrivateKeyTweakAdd(this.privateKey, IL);
      // throw if IL >= n || (privateKey + IL) === 0
    } catch (err) {
      console.log('error when secp256k1PrivateKeyTweakAdd in eth key derivation', err);

      // In case parse256(IL) >= n or ki == 0, one should proceed with the next value for i
      return this.deriveChild(index + 1);
    }

    hd.chainCode = IR;
    hd.depth = this.depth + 1;
    hd.parentFingerprint = this.fingerprint;// .readUInt32BE(0)
    hd.index = index;

    return hd;
  }

  // fromMasterSeed
  public static fromMasterSeed (seedBuffer: Uint8Array, versions?: Versions): HDKeyEth {
    const hdkey = versions
      ? new HDKeyEth(versions)
      : new HDKeyEth();
    const I = hmacSha512(MASTER_SECRET, seedBuffer);

    hdkey.privateKey = I.slice(0, 32);
    hdkey.chainCode = I.slice(32);

    return hdkey;
  }

  private hash160 (buf: Uint8Array): Uint8Array {
    return bufferToU8a(
      hash
        .ripemd160()
        .update(
          hash
            .sha256()
            .update(buf)
            .digest()
        ).digest()
    );
  }
}
