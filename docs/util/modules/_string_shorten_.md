[@polkadot/util](../README.md) > ["string/shorten"](../modules/_string_shorten_.md)

# External module: "string/shorten"

## Index

### Functions

* [stringShorten](_string_shorten_.md#stringshorten)

---

## Functions

<a id="stringshorten"></a>

###  stringShorten

▸ **stringShorten**(_value: *`any`*, prefixLength?: *`number`*): `string`

*Defined in [string/shorten.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/string/shorten.ts#L16)*

*__name__*: stringShorten

*__signature__*: stringShorten (value: any, prefixLength: number = 8): string

*__summary__*: Returns a string with maximum length

*__description__*: Checks the string against the `prefixLength`, if longer than dopuble this, shortens it by placing `..` in the middle of it

*__example__*: import { stringShorten } from '@polkadot/util';

stringShorten('1234567890', 2); // => 12..90

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| _value | `any` | - |
| `Default value` prefixLength | `number` | 6 |

**Returns:** `string`

___

