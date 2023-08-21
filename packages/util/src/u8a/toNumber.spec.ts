// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToUnsignedNumber, u8aToSignedNumber } from './index.js';

describe('u8aToSignedNumber', (): void => {
  describe('i8', (): void => {
    it('converts values (-128i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([128])
        )
      ).toBe(-128);
    });

    it('converts values (-127i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([129])
        )
      ).toBe(-127);
    });

    it('converts values (-123i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([133])
        )
      ).toBe(-123);
    });

    it('converts values (-42i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([214])
        )
      ).toBe(-42);
    });

    it('converts values (-1i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([255])
        )
      ).toBe(-1);
    });

    it('converts values (0i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([0])
        )
      ).toBe(0);
    });

    it('converts values (0i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([0])
        )
      ).toBe(0);
    });

    it('converts values (1i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([1])
        )
      ).toBe(1);
    });

    it('converts values (42i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([42])
        )
      ).toBe(42);
    });

    it('converts values (123i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([123])
        )
      ).toBe(123);
    });

    it('converts values (126i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([126])
        )
      ).toBe(126);
    });

    it('converts values (127i8)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([127])
        )
      ).toBe(127);
    });


  });

  describe('i16', (): void => {
    it('converts values (-32768i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([0, 128])
        )
      ).toBe(-32768);
    });

    it('converts values (-32767i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([1, 128])
        )
      ).toBe(-32767);
    });

    it('converts values (-12345i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([199, 207])
        )
      ).toBe(-12345);
    });

    it('converts values (-42i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([214, 255])
        )
      ).toBe(-42);
    });

    it('converts values (-1i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([255, 255])
        )
      ).toBe(-1);
    });

    it('converts values (0i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([0, 0])
        )
      ).toBe(0);
    });

    it('converts values (0i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([0, 0])
        )
      ).toBe(0);
    });

    it('converts values (1i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([1, 0])
        )
      ).toBe(1);
    });

    it('converts values (42i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([42, 0])
        )
      ).toBe(42);
    });

    it('converts values (12345i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([57, 48])
        )
      ).toBe(12345);
    });

    it('converts values (32766i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([254, 127])
        )
      ).toBe(32766);
    });

    it('converts values (32767i16)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([255, 127])
        )
      ).toBe(32767);
    });


  });

  describe('i32', (): void => {
    it('converts values (-2147483648i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([0, 0, 0, 128])
        )
      ).toBe(-2147483648);
    });

    it('converts values (-2147483647i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([1, 0, 0, 128])
        )
      ).toBe(-2147483647);
    });

    it('converts values (-1234i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([46, 251, 255, 255])
        )
      ).toBe(-1234);
    });

    it('converts values (-42i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([214, 255, 255, 255])
        )
      ).toBe(-42);
    });

    it('converts values (-1i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([255, 255, 255, 255])
        )
      ).toBe(-1);
    });

    it('converts values (0i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([0, 0, 0, 0])
        )
      ).toBe(0);
    });

    it('converts values (0i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([0, 0, 0, 0])
        )
      ).toBe(0);
    });

    it('converts values (1i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([1, 0, 0, 0])
        )
      ).toBe(1);
    });

    it('converts values (42i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([42, 0, 0, 0])
        )
      ).toBe(42);
    });

    it('converts values (1234i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([210, 4, 0, 0])
        )
      ).toBe(1234);
    });

    it('converts values (2147483646i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([254, 255, 255, 127])
        )
      ).toBe(2147483646);
    });

    it('converts values (2147483647i32)', (): void => {
      expect(
        u8aToSignedNumber(
          new Uint8Array([255, 255, 255, 127])
        )
      ).toBe(2147483647);
    });
  });

});


describe('u8aToUnsignedNumber', (): void => {
  describe('u8', (): void => {
    it('converts values (0u8)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([0])
        )
      ).toBe(0);
    });

    it('converts values (1u8)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([1])
        )
      ).toBe(1);
    });

    it('converts values (42u8)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([42])
        )
      ).toBe(42);
    });

    it('converts values (123u8)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([123])
        )
      ).toBe(123);
    });

    it('converts values (254u8)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([254])
        )
      ).toBe(254);
    });

    it('converts values (255u8)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([255])
        )
      ).toBe(255);
    });
  });

  describe('u16', (): void => {
    it('converts values (0u16)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([0, 0])
        )
      ).toBe(0);
    });

    it('converts values (1u16)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([1, 0])
        )
      ).toBe(1);
    });

    it('converts values (42u16)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([42, 0])
        )
      ).toBe(42);
    });

    it('converts values (12345u16)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([57, 48])
        )
      ).toBe(12345);
    });

    it('converts values (65534u16)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([254, 255])
        )
      ).toBe(65534);
    });

    it('converts values (65535u16)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([255, 255])
        )
      ).toBe(65535);
    });
  });

  describe('u32', (): void => {
    it('converts values (0u32)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([0, 0, 0, 0])
        )
      ).toBe(0);
    });

    it('converts values (1u32)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([1, 0, 0, 0])
        )
      ).toBe(1);
    });

    it('converts values (42u32)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([42, 0, 0, 0])
        )
      ).toBe(42);
    });

    it('converts values (1234567u32)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([135, 214, 18, 0])
        )
      ).toBe(1234567);
    });

    it('converts values (4294967294u32)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([254, 255, 255, 255])
        )
      ).toBe(4294967294);
    });

    it('converts values (4294967295u32)', (): void => {
      expect(
        u8aToUnsignedNumber(
          new Uint8Array([255, 255, 255, 255])
        )
      ).toBe(4294967295);
    });
  });
});
