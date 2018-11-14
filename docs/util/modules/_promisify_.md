

# Functions

<a id="promisify"></a>

##  promisify

▸ **promisify**(self: *`any`*, fn: *`Function`*, ...params: *`Array`<`any`>*): `Promise`<`any`>

*Defined in [promisify.ts:21](https://github.com/polkadot-js/common/blob/75c09a9/packages/util/src/promisify.ts#L21)*

*__name__*: promisify

*__signature__*: function promisify (this: ?Object, fn: Function, ...params: Array): Promise

*__summary__*: Wraps an async callback into a `Promise`

*__description__*: Wraps the supplied async function `fn` that has a standard JS callback `(error: Error, result: any)` into a `Promise`, passing the supplied parameters. When `error` is set, the Promise is rejected, else the Promise resolves with the `result` value.

*__example__*:   

```javascript
const { promisify } from '@polkadot/util';

await promisify(null, ((a, cb) => cb(null, a), true); // resolves with `true`
await promisify(null, (cb) => cb(new Error('error!'))); // rejects with `error!`
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| self | `any` |
| fn | `Function` |
| `Rest` params | `Array`<`any`> |

**Returns:** `Promise`<`any`>

___

