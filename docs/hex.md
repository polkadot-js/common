# hex

Internal utilities to create and test for hex values 

- [hexAddPrefix](#hexAddPrefix) Adds the `0x` prefix to string values.
- [hexHasPrefix](#hexHasPrefix) Tests for the existence of a `0x` prefix.
- [hexStripPrefix](#hexStripPrefix) Strips any leading `0x` prefix.

## hexAddPrefix

Adds the `0x` prefix to string values.

```js
hexAddPrefix (value: ?string): string
```


Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.

```js
import { hexAddPrefix } from '@polkadot/util';

console.log('With prefix', hexAddPrefix('0a0b12')) // => 0x0a0b12
```

## hexHasPrefix

Tests for the existence of a `0x` prefix.

```js
hexHasPrefix (value: ?string): boolean
```


Checks for a valid hex input value and if the start matched `0x`

```js
import { hexHasPrefix } from '@polkadot/util';

console.log('has prefix', hexHasPrefix('0x1234')); // => true
```

## hexStripPrefix

Strips any leading `0x` prefix.

```js
hexStripPrefix (value: ?string): string
```


Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.

```js
import { hexStripPrefix } from '@polkadot/util';

console.log('stripped', hexStripPrefix('0x1234')); // => 1234
```