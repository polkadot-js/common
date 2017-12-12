// ISC, Copyright 2017 Jaco Greeff

const { promisify } = require('./index');

describe('promisify', () => {
  it('requires a function to promisify', () => {
    expect(
      () => promisify()
    ).toThrow(/Expected function input/);
  });

  it('handles functions with no parameters (resolve)', () => {
    const fn = (cb) => cb(null, [true, 'test', 1]);

    return promisify(fn).then((result) => {
      expect(result).toEqual([true, 'test', 1]);
    });
  });

  it('handles functions with no parameters (reject)', () => {
    const fn = (cb) => cb(new Error('test reject'));

    return promisify(fn).catch((error) => {
      expect(error.message).toEqual('test reject');
    });
  });

  it('handles functions with parameters (resolve)', () => {
    const fn = (a, b, c, cb) => cb(null, [a, b, c]);

    return promisify(fn, 2, false, null).then((result) => {
      expect(result).toEqual([2, false, null]);
    });
  });

  it('handles functions with parameters (reject)', () => {
    const fn = (a, b, c, cb) => cb(new Error(`test reject: ${a},${b},${c}`));

    return promisify(fn, 3, 'string', true).catch((error) => {
      expect(error.message).toEqual('test reject: 3,string,true');
    });
  });
});
