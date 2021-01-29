// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a, u8aToHex } from '@polkadot/util';

import { naclKeypairFromSeed } from '../nacl';
import { hdEd25519 } from '.';

// https://github.com/jpopesculian/ed25519-dalek-bip32/blob/7f3c471679622c2aebadbbd02a20e54c96f05e39/src/lib.rs
const TESTS = [
  {
    pairPublic: '0x8c8a13df77a28f3445213a0f432fde644acaa215fc72dcdf300d5efaa85d350c',
    path: "m/0'",
    seed: '0x000102030405060708090a0b0c0d0e0f'
  },
  {
    pairPublic: '0x1932a5270f335bed617d5b935c80aedb1a35bd9fc1e31acafd5372c30f5c1187',
    path: "m/0'/1'",
    seed: '0x000102030405060708090a0b0c0d0e0f'
  },
  {
    pairPublic: '0xae98736566d30ed0e9d2f4486a64bc95740d89c7db33f52121f8ea8f76ff0fc1',
    path: "m/0'/1'/2'",
    seed: '0x000102030405060708090a0b0c0d0e0f'
  },
  {
    pairPublic: '0x8abae2d66361c879b900d204ad2cc4984fa2aa344dd7ddc46007329ac76c429c',
    path: "m/0'/1'/2'/2'",
    seed: '0x000102030405060708090a0b0c0d0e0f'
  },
  {
    pairPublic: '0x3c24da049451555d51a7014a37337aa4e12d41e485abccfa46b47dfb2af54b7a',
    path: "m/0'/1'/2'/2'/1000000000'",
    seed: '0x000102030405060708090a0b0c0d0e0f'
  },
  {
    pairPublic: '0x86fab68dcb57aa196c77c5f264f215a112c22a912c10d123b0d03c3c28ef1037',
    path: "m/0'",
    seed: '0xfffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542'
  },
  {
    pairPublic: '0x5ba3b9ac6e90e83effcd25ac4e58a1365a9e35a3d3ae5eb07b9e4d90bcf7506d',
    path: "m/0'/2147483647'",
    seed: '0xfffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542'
  },
  {
    pairPublic: '0x2e66aa57069c86cc18249aecf5cb5a9cebbfd6fadeab056254763874a9352b45',
    path: "m/0'/2147483647'/1'",
    seed: '0xfffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542'
  },
  {
    pairPublic: '0x2e66aa57069c86cc18249aecf5cb5a9cebbfd6fadeab056254763874a9352b45',
    path: "m/0'/2147483647'/1'",
    seed: '0xfffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542'
  },
  {
    pairPublic: '0xe33c0f7d81d843c572275f287498e8d408654fdf0d1e065b84e2e6f157aab09b',
    path: "m/0'/2147483647'/1'/2147483646'",
    seed: '0xfffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542'
  },
  {
    pairPublic: '0x47150c75db263559a70d5778bf36abbab30fb061ad69f69ece61a72b0cfa4fc0',
    path: "m/0'/2147483647'/1'/2147483646'/2'",
    seed: '0xfffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542'
  }
];

describe('hdEd25519', (): void => {
  TESTS.forEach(({ pairPublic, path, seed }, index): void => {
    it(`passes vector ${index}`, (): void => {
      const derived = hdEd25519(path, hexToU8a(seed));
      const pair = naclKeypairFromSeed(derived.key);

      expect(u8aToHex(pair.publicKey)).toEqual(pairPublic);
    });
  });
});
