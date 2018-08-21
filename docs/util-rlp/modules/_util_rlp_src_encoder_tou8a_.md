[@polkadot/util](../README.md) > ["util-rlp/src/encoder/toU8a"](../modules/_util_rlp_src_encoder_tou8a_.md)

# External module: "util-rlp/src/encoder/toU8a"

## Index

### Type aliases

* [Encoder](_util_rlp_src_encoder_tou8a_.md#encoder)

### Variables

* [encoders](_util_rlp_src_encoder_tou8a_.md#encoders)

### Functions

* [convertString](_util_rlp_src_encoder_tou8a_.md#convertstring)
* [convertU8a](_util_rlp_src_encoder_tou8a_.md#convertu8a)
* [newEmpty](_util_rlp_src_encoder_tou8a_.md#newempty)
* [toU8a](_util_rlp_src_encoder_tou8a_.md#tou8a)

---

## Type aliases

<a id="encoder"></a>

###  Encoder

**ΤEncoder**: *`object`*

*Defined in [util-rlp/src/encoder/toU8a.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/encoder/toU8a.ts#L20)*

#### Type declaration

 check: `function`

▸(value: *`any`*): `boolean`

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

 fn: `function`

▸(value: *`any`*): `Uint8Array`

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Uint8Array`

___

## Variables

<a id="encoders"></a>

### `<Const>` encoders

**● encoders**: *`Array`<[Encoder](_util_rlp_src_encoder_tou8a_.md#encoder)>* =  [
  { check: isNull, fn: newEmpty },
  { check: isUndefined, fn: newEmpty },
  // NOTE: Buffer before U8a
  { check: isBuffer, fn: bufferToU8a },
  { check: isU8a, fn: convertU8a },
  { check: isBn, fn: (value: any) => bnToU8a(value, -1, false) },
  { check: isNumber, fn: numberToU8a },
  { check: isString, fn: convertString }
]

*Defined in [util-rlp/src/encoder/toU8a.ts:41](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/encoder/toU8a.ts#L41)*

___

## Functions

<a id="convertstring"></a>

###  convertString

▸ **convertString**(value: *`string`*): `Uint8Array`

*Defined in [util-rlp/src/encoder/toU8a.ts:29](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/encoder/toU8a.ts#L29)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `string` |

**Returns:** `Uint8Array`

___
<a id="convertu8a"></a>

###  convertU8a

▸ **convertU8a**(value: *`Uint8Array`*): `Uint8Array`

*Defined in [util-rlp/src/encoder/toU8a.ts:37](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/encoder/toU8a.ts#L37)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `Uint8Array` |

**Returns:** `Uint8Array`

___
<a id="newempty"></a>

###  newEmpty

▸ **newEmpty**(): `Uint8Array`

*Defined in [util-rlp/src/encoder/toU8a.ts:25](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/encoder/toU8a.ts#L25)*

**Returns:** `Uint8Array`

___
<a id="tou8a"></a>

###  toU8a

▸ **toU8a**(value: *`any`*): `Uint8Array`

*Defined in [util-rlp/src/encoder/toU8a.ts:52](https://github.com/polkadot-js/util/blob/7550b44/packages/util-rlp/src/encoder/toU8a.ts#L52)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `Uint8Array`

___

