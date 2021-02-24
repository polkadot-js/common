// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as crypto from 'crypto';
import { Buffer } from 'safe-buffer';

import { assert } from '@polkadot/util';

import { secp256k1KeypairFromSeed, secp256k1PrivateKeyTweakAdd } from '../..';

const MASTER_SECRET = Buffer.from('Bitcoin seed', 'utf8');
const HARDENED_OFFSET = 0x80000000;
// Bitcoin hardcoded by default, can use package `coininfo` for others
const BITCOIN_VERSIONS = { private: 0x0488ADE4, public: 0x0488B21E };

interface Versions{
  private:number;
  public:number;
}

// function to retype Buffer to ArrayBuffer in a controlled manner
function bufferAsArrayBuffer (buffer:Buffer): ArrayBuffer {
  return buffer as unknown as ArrayBuffer;
}

// function to retype Uint8Array to Buffer in a controlled manner
function bytesAsBuffer (bytes:Uint8Array):Buffer {
  return bytes as unknown as Buffer;
}

export class HDKeyEth {
  versions:Versions;
  public depth:number;
  index:number;
  private _privateKey:Uint8Array|null;
  private _publicKey:Uint8Array|null;
  public chainCode:Uint8Array|null;
  private _fingerprint:number|null;
  parentFingerprint:number|null;
  private _identifier:Buffer|null;

  constructor (versions?:Versions) {
    this.versions = versions || BITCOIN_VERSIONS;
    this.depth = 0;
    this.index = 0;
    this._privateKey = null;
    this._publicKey = null;
    this._identifier = null;
    this.chainCode = null;
    this._fingerprint = null;
    this.parentFingerprint = 0;
  }

  // private key
  set privateKey (value:Uint8Array|null) {
    assert(value && value.length === 32, 'Private key must be 32 bytes.');
    // TODO: implement privateKeyVerify for local secp256k1
    // assert(secp256k1.privateKeyVerify(value) === true, 'Invalid private key');

    this._privateKey = value;

    if (value) {
      this._publicKey = secp256k1KeypairFromSeed(value).publicKey;
      this._identifier = this._publicKey ? this.hash160(this._publicKey) : null;
      this._fingerprint = this._identifier ? this._identifier.slice(0, 4).readUInt32BE(0) : null;
    }
  }

  get privateKey ():Uint8Array|null {
    return this._privateKey;
  }

  // public key

  get publicKey ():Uint8Array|null {
    return this._publicKey;
  }

  set publicKey (value:Uint8Array|null) {
    assert(value && (value.length === 33 || value.length === 65), 'Public key must be 33 or 65 bytes.');
    // TODO: implement publicKeyVerify for local secp256k1
    // assert(secp256k1.publicKeyVerify(value) === true, 'Invalid public key');

    // TODO: should I use the compress function here?
    this._publicKey = value; // new Uint8Array(Buffer.from(secp256k1.publicKeyConvert(value, true))); // force compressed point
    this._identifier = this._publicKey ? this.hash160(this._publicKey) : null;
    this._fingerprint = this._identifier ? this._identifier.slice(0, 4).readUInt32BE(0) : null;
    this._privateKey = null;
  }

  // fingerprint
  get fingerprint ():number|null {
    return this._fingerprint;
  }

  // identifier
  get identifier ():Buffer|null {
    return this._identifier;
  }

  // fingerprint
  get pubKeyHash ():Buffer|null {
    return this.identifier;
  }

  // derive
  public derive (path:string):HDKeyEth {
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
      if (hardened) childIndex += HARDENED_OFFSET;
      hdkey = hdkey.deriveChild(childIndex);
    });

    return hdkey;
  }

  // deriveChild
  private deriveChild (index:number):HDKeyEth {
    const isHardened = index >= HARDENED_OFFSET;
    const indexBuffer = Buffer.allocUnsafe(4);

    indexBuffer.writeUInt32BE(index, 0);

    let data;

    if (isHardened) { // Hardened child
      assert(this.privateKey, 'Could not derive hardened child key');

      if (this.privateKey) {
        const pk = this.privateKey;
        const zb = Buffer.alloc(1);
        const pkConcat = Buffer.concat([zb, bytesAsBuffer(pk)]);

        // data = 0x00 || ser256(kpar) || ser32(index)
        data = Buffer.concat([pkConcat, indexBuffer]);
      } else {
        throw new Error('Could not derive hardened child key : no privatekey');
      }
    } else { // Normal child
      // data = serP(point(kpar)) || ser32(index)
      //      = serP(Kpar) || ser32(index)
      if (this.publicKey) {
        data = Buffer.concat([bytesAsBuffer(this.publicKey), indexBuffer]);
      } else {
        throw new Error('Could not derive hardened child key : no publicKey');
      }
    }

    let I:Buffer = Buffer.from('');

    if (this.chainCode) {
      I = bytesAsBuffer(crypto.createHmac('sha512', this.chainCode).update(data as unknown as crypto.BinaryLike).digest());
    } else {
      throw new Error('deriveChild error: no chainCode');
    }

    const IL:Buffer = I.slice(0, 32);
    const IR:Buffer = I.slice(32);

    const hd = new HDKeyEth(this.versions);

    // Private parent key -> private child key
    if (this.privateKey) {
      // ki = parse256(IL) + kpar (mod n)r
      try {
        hd.privateKey = new Uint8Array(bufferAsArrayBuffer(Buffer.from(secp256k1PrivateKeyTweakAdd(new Uint8Array(bufferAsArrayBuffer(Buffer.from(this.privateKey))), new Uint8Array(bufferAsArrayBuffer(IL))))));
        // throw if IL >= n || (privateKey + IL) === 0
      } catch (err) {
        console.log('error when secp256k1PrivateKeyTweakAdd in eth key derivation', err);

        // In case parse256(IL) >= n or ki == 0, one should proceed with the next value for i
        return this.deriveChild(index + 1);
      }
      // Public parent key -> public child key
    } else {
      throw new Error('PublicKey derivation without private key is not supported at the moment');
    }

    hd.chainCode = new Uint8Array(bufferAsArrayBuffer(IR));
    hd.depth = this.depth + 1;
    hd.parentFingerprint = this.fingerprint;// .readUInt32BE(0)
    hd.index = index;

    return hd;
  }

  // fromMasterSeed
  public static fromMasterSeed = function (seedBuffer:crypto.BinaryLike, versions?:Versions):HDKeyEth {
    const I = crypto.createHmac('sha512', new Uint8Array(bufferAsArrayBuffer(MASTER_SECRET))).update(seedBuffer).digest();
    const IL = I.slice(0, 32);
    const IR = I.slice(32);

    const hdkey = versions ? new HDKeyEth(versions) : new HDKeyEth();

    hdkey.chainCode = new Uint8Array(IR);
    hdkey.privateKey = new Uint8Array(IL);

    return hdkey;
  }

  private hash160 (buf:crypto.BinaryLike):Buffer {
    const sha = crypto.createHash('sha256').update(buf).digest();

    return (crypto.createHash('ripemd160').update(sha).digest()) as unknown as Buffer;
  }
}
