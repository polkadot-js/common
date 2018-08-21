[@polkadot/util](../README.md) > ["util-rlp/src/decoder/decode"](../modules/_util_rlp_src_decoder_decode_.md)

# External module: "util-rlp/src/decoder/decode"

## Index

### Type aliases

* [Decoder](_util_rlp_src_decoder_decode_.md#decoder)

### Variables

* [decoders](_util_rlp_src_decoder_decode_.md#decoders)

### Functions

* [decode](_util_rlp_src_decoder_decode_.md#decode)

---

## Type aliases

<a id="decoder"></a>

###  Decoder

**ΤDecoder**: *`object`*

*Defined in [util-rlp/src/decoder/decode.ts:15](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/decoder/decode.ts#L15)*

#### Type declaration

 fn: `function`

▸(decode: *`DecodeFunc`*, input: *`Uint8Array`*): `DecodeOutput`

**Parameters:**

| Param | Type |
| ------ | ------ |
| decode | `DecodeFunc` |
| input | `Uint8Array` |

**Returns:** `DecodeOutput`

 max: `number`

___

## Variables

<a id="decoders"></a>

### `<Const>` decoders

**● decoders**: *`Array`<[Decoder](_util_rlp_src_decoder_decode_.md#decoder)>* =  [
  { max: 0x7f, fn: decodeSingle },
  { max: 0xb7, fn: decodeString },
  { max: 0xbf, fn: decodeNumber },
  { max: 0xf7, fn: decodeListShort },
  { max: 0xff, fn: decodeListLong }
]

*Defined in [util-rlp/src/decoder/decode.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/decoder/decode.ts#L20)*

___

## Functions

<a id="decode"></a>

###  decode

▸ **decode**(input: *`Uint8Array`*): `DecodeOutput`

*Defined in [util-rlp/src/decoder/decode.ts:28](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/decoder/decode.ts#L28)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| input | `Uint8Array` |

**Returns:** `DecodeOutput`

___

