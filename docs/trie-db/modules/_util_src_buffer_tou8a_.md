[@polkadot/util](../README.md) > ["util/src/buffer/toU8a"](../modules/_util_src_buffer_tou8a_.md)

# External module: "util/src/buffer/toU8a"

## Index

### Functions

* [bufferToU8a](_util_src_buffer_tou8a_.md#buffertou8a)

---

## Functions

<a id="buffertou8a"></a>

###  bufferToU8a

▸ **bufferToU8a**(buffer?: * `Buffer` &#124; `number`[]*): `Uint8Array`

*Defined in [util/src/buffer/toU8a.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/buffer/toU8a.ts#L16)*

*__name__*: bufferToU8a

*__signature__*: bufferToU8a (value?: Buffer): string

*__summary__*: Creates a Uint8Array value from a Buffer object.

*__description__*: `null` inputs returns an empty result, `Buffer` values return the actual value as a `Uint8Array`. Anything that is not a `Buffer` object throws an error.

*__example__*: import { bufferToU8a } from '@polkadot/util';

bufferToU8a(Buffer.from(\[1, 2, 3\]));

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` buffer |  `Buffer` &#124; `number`[]|

**Returns:** `Uint8Array`

___

