[@polkadot/util](../README.md) > ["u8a/toBn"](../modules/_u8a_tobn_.md)

# External module: "u8a/toBn"

## Index

### Functions

* [u8aToBn](_u8a_tobn_.md#u8atobn)

---

## Functions

<a id="u8atobn"></a>

###  u8aToBn

▸ **u8aToBn**(value: *`Uint8Array`*, isLe: *`boolean`*): `BN`

*Defined in [u8a/toBn.ts:21](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/toBn.ts#L21)*

*__name__*: u8aToBn

*__signature__*: u8aToHex (value?: Uint8Array, isLe: boolean = false): BN

*__summary__*: Creates a BN from a Uint8Array object.

*__description__*: `UInt8Array` input values return the actual BN. `null` or `undefined` values returns an `0x0` value.

*__example__*: import { u8aToBn } from '@polkadot/util';

u8aToHex(new Uint8Array(\[0x68, 0x65, 0x6c, 0x6c, 0xf\])); // 0x68656c0f

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `Uint8Array` |
| isLe | `boolean` |

**Returns:** `BN`

___

