[@polkadot/util](../README.md) > ["util/src/u8a/fixLength"](../modules/_util_src_u8a_fixlength_.md)

# External module: "util/src/u8a/fixLength"

## Index

### Functions

* [u8aFixLength](_util_src_u8a_fixlength_.md#u8afixlength)

---

## Functions

<a id="u8afixlength"></a>

###  u8aFixLength

▸ **u8aFixLength**(value: *`Uint8Array`*, bitLength?: *`number`*, atStart?: *`boolean`*): `Uint8Array`

*Defined in [util/src/u8a/fixLength.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/fixLength.ts#L18)*

*__name__*: u8aFixLength

*__signature__*: u8aFixLength (value: string, bitLength: number = -1, withPadding: boolean = false): string

*__summary__*: Shifts a Uint8Array to a specific bitLength

*__description__*: Returns a uint8Array with the specified number of bits contained in the return value. (If bitLength is -1, length checking is not done). Values with more bits are trimmed to the specified length.

*__example__*: import { u8aFixLength } from '@polkadot/util';

u8aFixLength('0x12') // => 0x12 u8aFixLength('0x12', 16) // => 0x0012 u8aFixLength('0x1234', 8) // => 0x12

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| value | `Uint8Array` | - |
| `Default value` bitLength | `number` |  -1 |
| `Default value` atStart | `boolean` | false |

**Returns:** `Uint8Array`

___

