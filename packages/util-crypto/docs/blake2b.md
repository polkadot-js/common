# blake2b

Create [Blake2b](https://blake2.net/) values as hex & Uint8Array output 

- [blake2bAsHex](#blake2bashex) Creates a blake2b hex string from the input.
- [blake2bAsU8a](#blake2basu8a) Creates a blake2b Uint8Array from the input.

## blake2bAsHex

Creates a blake2b hex string from the input. 

```js
blake2bAsHex (value: Uint8Array): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string.

```js
import { blake2bAsHex } from '@polkadot/util-crypto';

blake2bAsHex('abc') // => '0xba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923'
```

## blake2bAsU8a

Creates a blake2b Uint8Array from the input. 

```js
blake2bAsU8a (value: Uint8Array): Uint8Array
```


From a `Uint8Array` input, create the blake2b and return the result as a `Uint8Array`.

```js
import { blake2bAsU8a } from '@polkadot/util-crypto';

blake2bAsU8a('abc') // => Uint8Array('508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982')
```