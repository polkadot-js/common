

@polkadot/common/trie-db
========================

Overview
--------
*__name__*: Trie

*__summary__*: Re-implementation of a Patricia Trie

*__example__*: See [Polkadot-JS Common Trie-DB Examples](https://polkadot.js.org/api/common/examples/trie-db/)

# Hierarchy

 [Checkpoint](_checkpoint_.checkpoint.md)

**↳ Impl**

↳  [Trie](_index_.trie.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Impl**(db: *`TxDb`*, rootHash?: *`Uint8Array`*, codec?: *`Codec`*): [Impl](_impl_.impl.md)

*Overrides [Checkpoint](_checkpoint_.checkpoint.md).[constructor](_checkpoint_.checkpoint.md#constructor)*

*Defined in [Impl.ts:38](https://github.com/polkadot-js/common/blob/294c255/packages/trie-db/src/Impl.ts#L38)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| db | `TxDb` | - |
| `Optional` rootHash | `Uint8Array` | - |
| `Default value` codec | `Codec` |  substrateCodec |

**Returns:** [Impl](_impl_.impl.md)

___

# Properties

<a id="db"></a>

##  db

**● db**: *`TxDb`*

*Defined in [Impl.ts:36](https://github.com/polkadot-js/common/blob/294c255/packages/trie-db/src/Impl.ts#L36)*

___

