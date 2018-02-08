# Available interfaces

Utility methods to encode and decode [Ethereum RLP](https://github.com/ethereum/wiki/wiki/RLP). Adapted from the [EthereumJS implementation](https://github.com/ethereumjs/rlp/blob/0ce09db81fc303fcee593f7cc094ba44015f9b92/index.js) 


# Available methods

## decode

Decodes the input RLP. 

```js
decoder (input?: Uint8Array): Uint8Array | Array<*>
```


From an input, decod the RLP and return the result as a `Uint8Array` or `Array`.

```js
import { decode } from '@polkadot/util-rlp';

encode(new Uint8Array([0x83, 0x64, 0x6f, 0x67])) // => 'dog' as Uint8Array
```

## encode

Encodes the input value into RLP. 

```js
encode (input: any): Uint8Array
```


From an input, calculate the RLP and return the result as a `Uint8Array`.

```js
import { encode } from '@polkadot/util-rlp';

encode('dog') // => [0x83, 0x64, 0x6f, 0x67]
```