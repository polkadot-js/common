// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import isError from '../is/error';
import { ExtError } from '.';

describe('ExtError', (): void => {
  describe('constructor', (): void => {
    it('constructs an Error that is still an Error', (): void => {
      expect(
        isError(
          new ExtError()
        )
      ).toEqual(true);
    });
  });

  describe('static', (): void => {
    it('exposes the .CODES as a static', (): void => {
      expect(
        Object.keys(ExtError.CODES)
      ).not.toEqual(0);
    });
  });

  describe('constructor properties', (): void => {
    it('sets the .message property', (): void => {
      expect(
        new ExtError('test message').message
      ).toEqual('test message');
    });

    it("sets the .message to '' when not set", (): void => {
      expect(
        new ExtError().message
      ).toEqual('');
    });

    it('sets the .code property', (): void => {
      expect(
        new ExtError('test message', 1234).code
      ).toEqual(1234);
    });

    it('sets the .code to UKNOWN when not set', (): void => {
      expect(
        new ExtError('test message').code
      ).toEqual(ExtError.CODES.UNKNOWN);
    });

    it('sets the .data property', (): void => {
      const data = 'here';

      expect(
        new ExtError('test message', 1234, data).data
      ).toEqual(data);
    });
  });

  describe('stack traces', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let captureStackTrace: (targetObject: Record<string, any>, constructorOpt?: Function | undefined) => void;

    beforeEach((): void => {
      captureStackTrace = Error.captureStackTrace;

      Error.captureStackTrace = function (error): void {
        Object.defineProperty(error, 'stack', {
          configurable: true,
          get: function getStack (): string {
            const value = 'some stack returned';

            Object.defineProperty(this, 'stack', { value });

            return value;
          }
        });
      };
    });

    afterEach((): void => {
      Error.captureStackTrace = captureStackTrace;
    });

    it('captures via captureStackTrace when available', (): void => {
      expect(
        new ExtError().stack
      ).toEqual('some stack returned');
    });

    it('captures via stack when captureStackTrace not available', (): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Error.captureStackTrace = null as any;

      expect(
        new ExtError().stack.length
      ).not.toEqual(0);
    });
  });
});
