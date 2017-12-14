# string

Utility methods to convert to work with `string` values 

- [stringShorten](#stringshorten) Returns a string with maximum length

## stringShorten

Returns a string with maximum length 

```js
stringShorten (value: any, prefixLength: number = 8): string
```


Checks the string against the `prefixLength`, if longer than dopuble this, shortens it by placing `..` in the middle of it

```js
import { stringShorten } from '@polkadot/util';

stringShorten('1234567890', 2); // => 12..90
```