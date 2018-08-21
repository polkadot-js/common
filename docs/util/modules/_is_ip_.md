[@polkadot/util](../README.md) > ["is/ip"](../modules/_is_ip_.md)

# External module: "is/ip"

## Index

### Type aliases

* [IpTypes](_is_ip_.md#iptypes)

### Functions

* [isIp](_is_ip_.md#isip)

---

## Type aliases

<a id="iptypes"></a>

###  IpTypes

**ΤIpTypes**: * "v4" &#124; "v6"
*

*Defined in [is/ip.ts:7](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/ip.ts#L7)*

___

## Functions

<a id="isip"></a>

###  isIp

▸ **isIp**(value: *`string`*, type?: *[IpTypes](_is_ip_.md#iptypes)*): `boolean`

*Defined in [is/ip.ts:23](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/ip.ts#L23)*

*__name__*: isIp

*__signature__*: isIp (value: string, type?: 'v4' | 'v6'): boolean

*__summary__*: Tests if the value is a valid IP address

*__description__*: Checks to see if the value is a valid IP address. Optionally check for either v4/v6

*__example__*: import { isIp } from '@polkadot/util';

isIp('192.168.0.1')); // => true isIp('1:2:3:4:5:6:7:8'); // => true isIp('192.168.0.1', 'v6')); // => false isIp('1:2:3:4:5:6:7:8', 'v4'); // => false

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `string` |
| `Optional` type | [IpTypes](_is_ip_.md#iptypes) |

**Returns:** `boolean`

___

