[@polkadot/util-crypto](../README.md) > ["util/src/bn/toBn"](../modules/_util_src_bn_tobn_.md)

# External module: "util/src/bn/toBn"

## Index

### Functions

* [bnToBn](_util_src_bn_tobn_.md#bntobn)

---

## Functions

<a id="bntobn"></a>

###  bnToBn

▸ **bnToBn**(value?: * `BN` &#124; `number`*): `BN`

*Defined in [util/src/bn/toBn.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/bn/toBn.ts#L20)*

*__name__*: bnToBn

*__signature__*: bnToBn (value?: BN : number): BN

*__summary__*: Creates a BN value from a BN.js bignumber or number input.

*__description__*: `null` inputs returns a `0x0` result, BN values returns the value, numnbers returns a BN representation.

*__example__*: import BN from 'bn.js'; import { bnToBn } from '@polkadot/util';

bnToBn(0x1234); // => BN(0x1234) bnToBn(new BN(0x1234)); // => BN(0x1234)

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` value |  `BN` &#124; `number`|

**Returns:** `BN`

___

