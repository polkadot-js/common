// ISC, Copyright 2017 Jaco Greeff

const { promisify } = require('./index');

describe('promisify', () => {
  it('handles functions with no parameters (resolve)', () => {
    const fn = (cb) => cb(null, [true, 'test', 1]);

    return promisify(null, fn).then((result) => {
      expect(result).toEqual([true, 'test', 1]);
    });
  });

  it('handles functions with no parameters (reject)', () => {
    const fn = (cb) => cb(new Error('test reject'));

    return promisify(null, fn).catch((error) => {
      expect(error.message).toEqual('test reject');
    });
  });

  it('handles functions with parameters (resolve)', () => {
    const fn = (a, b, c, cb) => cb(null, [a, b, c]);

    return promisify(null, fn, 2, false, null).then((result) => {
      expect(result).toEqual([2, false, null]);
    });
  });

  it('handles functions with parameters (reject)', () => {
    const fn = (a, b, c, cb) => cb(new Error(`test reject: ${a},${b},${c}`));

    return promisify(null, fn, 3, 'string', true).catch((error) => {
      expect(error.message).toEqual('test reject: 3,string,true');
    });
  });

  it('applies the correct this argument', () => {
    const self = { something: 'something' };

    return promisify(self, function (cb) {
      expect(this).toEqual(self);
      cb();
    });
  });
});
