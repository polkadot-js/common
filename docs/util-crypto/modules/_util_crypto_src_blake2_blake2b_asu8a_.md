[@polkadot/util](../README.md) > ["util-crypto/src/blake2/blake2b/asU8a"](../modules/_util_crypto_src_blake2_blake2b_asu8a_.md)

# External module: "util-crypto/src/blake2/blake2b/asU8a"

## Index

### Functions

* [blake2bAsU8a](_util_crypto_src_blake2_blake2b_asu8a_.md#blake2basu8a)

---

## Functions

<a id="blake2basu8a"></a>

###  blake2bAsU8a

▸ **blake2bAsU8a**(data: *`Uint8Array`*, bitLength?: *`number`*, key?: * `Uint8Array` &#124; `null`*): `Uint8Array`

*Defined in [util-crypto/src/blake2/blake2b/asU8a.ts:19](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/blake2/blake2b/asU8a.ts#L19)*

*__name__*: blake2bAsU8a

*__signature__*: blake2bAsU8a (value: Uint8Array): Uint8Array

*__summary__*: Creates a blake2b Uint8Array from the input.

*__description__*: From a `Uint8Array` input, create the blake2b and return the result as a `Uint8Array`.

*__example__*: import { blake2bAsU8a } from '@polkadot/util-crypto';

blake2bAsU8a('abc') // => Uint8Array('508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982')

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| data | `Uint8Array` | - |
| `Default value` bitLength | `number` | 512 |
| `Default value` key |  `Uint8Array` &#124; `null`|  null |

**Returns:** `Uint8Array`

___

