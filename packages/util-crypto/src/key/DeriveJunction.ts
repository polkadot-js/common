// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import type BN from 'bn.js';

import { bnToHex, compactAddLength, hexToU8a, isBigInt, isBn, isHex, isNumber, isString, stringToU8a } from '@polkadot/util';

import blake2AsU8a from '../blake2/asU8a';

const RE_NUMBER = /^\d+$/;

const JUNCTION_ID_LEN = 32;
const BN_OPTIONS = {
  bitLength: 256,
  isLe: true
};

export default class DeriveJunction {
  readonly #chainCode: Uint8Array = new Uint8Array(32);

  #isHard = false;

  public static from (value: string): DeriveJunction {
    const result = new DeriveJunction();
    const [code, isHard] = value.startsWith('/')
      ? [value.substr(1), true]
      : [value, false];

    result.soft(
      RE_NUMBER.test(code)
        ? parseInt(code, 10)
        : code
    );

    return isHard
      ? result.harden()
      : result;
  }

  public get chainCode (): Uint8Array {
    return this.#chainCode;
  }

  public get isHard (): boolean {
    return this.#isHard;
  }

  public get isSoft (): boolean {
    return !this.#isHard;
  }

  public hard (value: number | string | BigInt | BN | Uint8Array): DeriveJunction {
    return this.soft(value).harden();
  }

  public harden (): DeriveJunction {
    this.#isHard = true;

    return this;
  }

  public soft (value: number | string | BigInt | BN | Uint8Array): DeriveJunction {
    if (isNumber(value) || isBn(value) || isBigInt(value)) {
      return this.soft(bnToHex(value, BN_OPTIONS));
    } else if (isString(value)) {
      return isHex(value)
        ? this.soft(hexToU8a(value))
        : this.soft(compactAddLength(stringToU8a(value)));
    }

    if (value.length > JUNCTION_ID_LEN) {
      return this.soft(blake2AsU8a(value));
    }

    this.#chainCode.fill(0);
    this.#chainCode.set(value, 0);

    return this;
  }

  public soften (): DeriveJunction {
    this.#isHard = false;

    return this;
  }
}
