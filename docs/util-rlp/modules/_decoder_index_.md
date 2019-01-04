

# Functions

<a id="decoder"></a>

##  decoder

▸ **decoder**(input?: *`null` | `Uint8Array`*): `Uint8Array` | `Array`<`any`>

*Defined in [decoder/index.ts:24](https://github.com/polkadot-js/common/blob/89030f4/packages/util-rlp/src/decoder/index.ts#L24)*

*__name__*: decoder

*__signature__*: decoder (input?: Uint8Array): Uint8Array | Array<\*>

*__summary__*: Decodes the input RLP.

*__description__*: From an input, decode the RLP and return the result as a `Uint8Array` or `Array`.

*__example__*:   

```javascript
import { decode } from '@polkadot/util-rlp';

decode(new Uint8Array([0x83, 0x64, 0x6f, 0x67])); // => 'dog' as Uint8Array
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` input | `null` | `Uint8Array` |

**Returns:** `Uint8Array` | `Array`<`any`>

___

