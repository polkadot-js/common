

# Functions

<a id="getsharedlength"></a>

##  getSharedLength

▸ **getSharedLength**(a: *`Uint8Array`*, b: *`Uint8Array`*): `number`

*Defined in [util/sharedLength.ts:13](https://github.com/polkadot-js/common/blob/7a43354/packages/trie-hash/src/util/sharedLength.ts#L13)*

*__name__*: getSharedLength

*__signature__*: getSharedLength (a: Uint8Array, b: Uint8Array): number

*__summary__*: Returns the highest shared index of two u8a's where the values in lesser indexes are the same. Given two u8a's, it first determines the u8a with the shortest length, then iterates through each u8a up to that length. If the value in both u8a's is the same for a certain index, it returns that index, otherwise it returns the shortest length.

**Parameters:**

| Param | Type |
| ------ | ------ |
| a | `Uint8Array` |
| b | `Uint8Array` |

**Returns:** `number`

___

