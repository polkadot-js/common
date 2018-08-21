[@polkadot/util-crypto](../README.md) > ["util-crypto/src/keccak/asU8a"](../modules/_util_crypto_src_keccak_asu8a_.md)

# External module: "util-crypto/src/keccak/asU8a"

## Index

### Functions

* [keccakAsU8a](_util_crypto_src_keccak_asu8a_.md#keccakasu8a)

---

## Functions

<a id="keccakasu8a"></a>

###  keccakAsU8a

▸ **keccakAsU8a**(value: * `Buffer` &#124; `Uint8Array` &#124; `string`*): `Uint8Array`

*Defined in [util-crypto/src/keccak/asU8a.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/keccak/asU8a.ts#L18)*

*__name__*: keccakAsU8a

*__signature__*: keccakAsU8a (value: Buffer | Uint8Array | string): Uint8Array

*__summary__*: Creates a keccak Uint8Array from the input.

*__description__*: From either a `string` or a `Buffer` input, create the keccak and return the result as a `Uint8Array`.

*__example__*: import { keccakAsU8a } from '@polkadot/util-crypto';

keccakAsU8a('123') // => Uint8Array

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `Buffer` &#124; `Uint8Array` &#124; `string`|

**Returns:** `Uint8Array`

___

