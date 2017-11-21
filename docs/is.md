# is

Type checking utilities 

- [isBN](#isBN) Tests for a `BN` object instance.
- [isBuffer](#isBuffer) Tests for a `Buffer` object instance.
- [isFunction](#isFunction) Tests for a `function`.
- [isHex](#isHex) Tests for a hex string.
- [isInstanceOf](#isInstanceOf) Tests for a instance of a class.
- [isNumber](#isNumber) Tests for a JavaScript number.
- [isString](#isString) Tests for a string.
- [isUndefined](#isUndefined) Tests for a `undefined` values.

## isBN

Tests for a `BN` object instance.

```js
isBN (value: any): boolean
```


Checks to see if the input object is an instance of `BN` (bn.js).

```js
import BN from 'bn.js';
import { isBN } from '@polkadot/util';

console.log('isBN', isBN(new BN(1))); // => true
```

## isBuffer

Tests for a `Buffer` object instance.

```js
isBuffer (value: any): boolean
```


Checks to see if the input object is an instance of `Buffer`.

```js
import { isBuffer } from '@polkadot/util';

console.log('isBuffer', isBuffer(Buffer.from([]))); // => true
```

## isFunction

Tests for a `function`.

```js
isFunction (value: any): boolean
```


Checks to see if the input value is a JavaScript function.

```js
import { isFunction } from '@polkadot/util';

console.log('isFunction', isFunction(() => false)); // => true
```

## isHex

Tests for a hex string.

```js
isHex (value: any): boolean
```


Checks to see if the input value is a `0x` prefixed hex string.

```js
import { isHex } from '@polkadot/util';

console.log('isHex', isHex('0x1234')); // => true
```

## isInstanceOf

Tests for a instance of a class.

```js
isInstanceOf (value: any, clazz: any): boolean
```


Checks to see if the input value is an instance of the test class.

```js
import { isInstanceOf } from '@polkadot/util';

console.log('isinstanceOf', isInstanceOf(new Array(0), Array)); // => true
```

## isNumber

Tests for a JavaScript number.

```js
isNumber (value: any): boolean
```


Checks to see if the input value is a valid number.

```js
import { isNumber } from '@polkadot/util';

console.log('isNumber', isNumber(1234)); // => true
```

## isString

Tests for a string.

```js
isString (value: any): boolean
```


Checks to see if the input value is a JavaScript string.

```js
import { isString } from '@polkadot/util';

console.log('isString', isString('test')); // => true
```

## isUndefined

Tests for a `undefined` values.

```js
isUndefined (value: any): boolean
```


Checks to see if the input value is `undefined`.

```js
import { isUndefined } from '@polkadot/util';

console.log('isUndefined', isUndefined(void(0))); // => true
```