// ISC, Copyright 2017-2018 Jaco Greeff

const { assert } = require('./index');

describe('assert', () => {
  it('should not throw an error when test is true', () => {
    expect(
      assert(true, 'nothing should be thrown')
    ).toEqual(true);
  });

  it('should throw an error when test is not true', () => {
    expect(
      () => assert(false, 'error thrown')
    ).toThrow(/error thrown/);
  });

  it('should throw an error when message: () => string', () => {
    expect(
      () => assert(false, () => 'message from function')
    ).toThrow(/message from function/);
  });

  it('throws a valid constructed ExtError', () => {
    try {
      assert(false, 'error', -666, { some: 'data' });
    } catch (error) {
      expect(error.code).toEqual(-666);
      expect(error.data).toEqual({ some: 'data' });
      expect(error.message).toEqual('error');
    }
  });
});
