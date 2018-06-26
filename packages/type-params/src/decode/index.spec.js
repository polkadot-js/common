// Copyright 2017-2018 @polkadot/params authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import decode from './index';

describe('decode', () => {
  it('decodes single types', () => {
    expect(
      JSON.stringify(
        decode('BlockNumber', new Uint8Array([
          0x69, 0, 0, 0, 0, 0, 0, 0
        ]))
      )
    ).toEqual('{"length":8,"value":"69"}');
  });

  it('decodes simple arrays', () => {
    expect(
      JSON.stringify(
        decode(['BlockNumber'], new Uint8Array([
          0x03, 0, 0, 0,
          0x69, 0, 0, 0, 0, 0, 0, 0,
          0x42, 0, 0, 0, 0, 0, 0, 0,
          0x15, 0, 0, 0, 0, 0, 0, 0
        ]))
      )
    ).toEqual('{"length":28,"value":["69","42","15"]}');
  });

  it('decodes tuple arrays', () => {
    expect(
      JSON.stringify(
        decode(['BlockNumber', 'bool'], new Uint8Array([
          0x69, 0, 0, 0, 0, 0, 0, 0,
          0x01
        ]))
      )
    ).toEqual('{"length":9,"value":["69",true]}');
  });

  it('decodes arrays with tuples', () => {
    expect(
      JSON.stringify(
        decode([['BlockNumber', 'bool']], new Uint8Array([
          0x03, 0, 0, 0,
          0x69, 0, 0, 0, 0, 0, 0, 0,
          0x01,
          0x42, 0, 0, 0, 0, 0, 0, 0,
          0x00,
          0x15, 0, 0, 0, 0, 0, 0, 0,
          0x01
        ]))
      )
    ).toEqual('{"length":31,"value":[["69",true],["42",false],["15",true]]}');
  });

  it('decodes tuples with arrays', () => {
    expect(
      JSON.stringify(
        decode(['BlockNumber', ['bool']], new Uint8Array([
          0x69, 0, 0, 0, 0, 0, 0, 0,
          0x03, 0, 0, 0,
          0x01,
          0x00,
          0x01
        ]))
      )
    ).toEqual('{"length":15,"value":["69",[true,false,true]]}');
  });
});
