// ISC, Copyright 2017-2018 Jaco Greeff

const syncify = require('./syncify');

describe('syncify', () => {
  it('returns the result of the promise', () => {
    expect(
      syncify(
        new Promise((resolve) => {
          setTimeout(() => resolve(12345), 100);
        })
      )
    ).toEqual(12345);
  });

  it('throws promise exceptions', () => {
    expect(
      () => syncify(
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('test reject error')), 100);
        })
      )
    ).toThrow(/test reject error/);
  });
});
