[@polkadot/util](../README.md) > ["util-keyring/src/pair/decode"](../modules/_util_keyring_src_pair_decode_.md)

# External module: "util-keyring/src/pair/decode"

## Index

### Variables

* [DIV_OFFSET](_util_keyring_src_pair_decode_.md#div_offset)
* [KEY_LENGTH](_util_keyring_src_pair_decode_.md#key_length)
* [PUBLIC_OFFSET](_util_keyring_src_pair_decode_.md#public_offset)
* [SEED_OFFSET](_util_keyring_src_pair_decode_.md#seed_offset)

### Functions

* [decode](_util_keyring_src_pair_decode_.md#decode)

---

## Variables

<a id="div_offset"></a>

### `<Const>` DIV_OFFSET

**● DIV_OFFSET**: *`number`* =  SEED_OFFSET + KEY_LENGTH

*Defined in [util-keyring/src/pair/decode.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/pair/decode.ts#L16)*

___
<a id="key_length"></a>

### `<Const>` KEY_LENGTH

**● KEY_LENGTH**: *`32`* = 32

*Defined in [util-keyring/src/pair/decode.ts:14](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/pair/decode.ts#L14)*

___
<a id="public_offset"></a>

### `<Const>` PUBLIC_OFFSET

**● PUBLIC_OFFSET**: *`number`* =  SEED_OFFSET + KEY_LENGTH + PKCS8_DIVIDER.length

*Defined in [util-keyring/src/pair/decode.ts:17](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/pair/decode.ts#L17)*

___
<a id="seed_offset"></a>

### `<Const>` SEED_OFFSET

**● SEED_OFFSET**: *`number`* =  PKCS8_HEADER.length

*Defined in [util-keyring/src/pair/decode.ts:15](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/pair/decode.ts#L15)*

___

## Functions

<a id="decode"></a>

###  decode

▸ **decode**(passphrase?: * `undefined` &#124; `string`*, _encrypted?: *`Uint8Array`*): `object`

*Defined in [util-keyring/src/pair/decode.ts:19](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/pair/decode.ts#L19)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` passphrase |  `undefined` &#124; `string`|
| `Optional` _encrypted | `Uint8Array` |

**Returns:** `object`

___

