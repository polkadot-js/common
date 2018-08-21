[@polkadot/util](../README.md) > ["util-crypto/src/keccak/asHex"](../modules/_util_crypto_src_keccak_ashex_.md)

# External module: "util-crypto/src/keccak/asHex"

## Index

### Functions

* [keccakAsHex](_util_crypto_src_keccak_ashex_.md#keccakashex)

---

## Functions

<a id="keccakashex"></a>

###  keccakAsHex

▸ **keccakAsHex**(value: * `Buffer` &#124; `Uint8Array` &#124; `string`*): `string`

*Defined in [util-crypto/src/keccak/asHex.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/keccak/asHex.ts#L20)*

*__name__*: keccakAsHex

*__signature__*: keccakAsHex (value: Buffer | Uint8Array | string): string

*__summary__*: Creates a keccak hex string from the input.

*__description__*: From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.

*__example__*: import { keccakAsHex } from '@polkadot/util-crypto';

keccakAsHex('123') // => 0x...

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `Buffer` &#124; `Uint8Array` &#124; `string`|

**Returns:** `string`

___

