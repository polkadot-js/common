[@polkadot/util](../README.md) > ["trie-db/src/encoder/index"](../modules/_trie_db_src_encoder_index_.md)

# External module: "trie-db/src/encoder/index"

## Index

### Variables

* [l](_trie_db_src_encoder_index_.md#l)

### Functions

* [encoder](_trie_db_src_encoder_index_.md#encoder)

### Object literals

* [encoding](_trie_db_src_encoder_index_.md#encoding)
* [options](_trie_db_src_encoder_index_.md#options)

---

## Variables

<a id="l"></a>

### `<Const>` l

**● l**: *`object`* =  logger('trie/codec')

*Defined in [trie-db/src/encoder/index.ts:15](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L15)*

#### Type declaration

 debug: `function`

▸(...values: *`Logger$Data`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` values | `Logger$Data` |

**Returns:** `void`

 error: `function`

▸(...values: *`Logger$Data`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` values | `Logger$Data` |

**Returns:** `void`

 log: `function`

▸(...values: *`Logger$Data`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` values | `Logger$Data` |

**Returns:** `void`

 warn: `function`

▸(...values: *`Logger$Data`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` values | `Logger$Data` |

**Returns:** `void`

___

## Functions

<a id="encoder"></a>

###  encoder

▸ **encoder**(db: *`LevelUp$AbstractStorage`*): `any`

*Defined in [trie-db/src/encoder/index.ts:29](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L29)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| db | `LevelUp$AbstractStorage` |

**Returns:** `any`

___

## Object literals

<a id="encoding"></a>

### `<Const>` encoding

**encoding**: *`object`*

*Defined in [trie-db/src/encoder/index.ts:17](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L17)*

<a id="encoding.buffer"></a>

####  buffer

**● buffer**: *`boolean`* = true

*Defined in [trie-db/src/encoder/index.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L18)*

___
<a id="encoding.decode"></a>

####  decode

**● decode**: *`(Anonymous function)`* =  decode(l)

*Defined in [trie-db/src/encoder/index.ts:19](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L19)*

___
<a id="encoding.encode"></a>

####  encode

**● encode**: *`(Anonymous function)`* =  encode(l)

*Defined in [trie-db/src/encoder/index.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L20)*

___
<a id="encoding.type"></a>

####  type

**● type**: *`string`* = "Uint8Array"

*Defined in [trie-db/src/encoder/index.ts:21](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L21)*

___

___
<a id="options"></a>

### `<Const>` options

**options**: *`object`*

*Defined in [trie-db/src/encoder/index.ts:24](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L24)*

<a id="options.keyencoding"></a>

####  keyEncoding

**● keyEncoding**: *`any`* =  encoding

*Defined in [trie-db/src/encoder/index.ts:25](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L25)*

___
<a id="options.valueencoding"></a>

####  valueEncoding

**● valueEncoding**: *`any`* =  encoding

*Defined in [trie-db/src/encoder/index.ts:26](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/encoder/index.ts#L26)*

___

___

