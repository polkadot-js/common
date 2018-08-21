[@polkadot/util](../README.md) > ["promisify"](../modules/_promisify_.md)

# External module: "promisify"

## Index

### Functions

* [promisify](_promisify_.md#promisify)

---

## Functions

<a id="promisify"></a>

###  promisify

▸ **promisify**(self: *`any`*, fn: *`Function`*, ...params: *`Array`<`any`>*): `Promise`<`any`>

*Defined in [promisify.ts:17](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/promisify.ts#L17)*

*__name__*: promisify

*__signature__*: function promisify (this: ?Object, fn: Function, ...params: Array): Promise

*__summary__*: Wraps an async callback into a `Promise`

*__description__*: Wraps the supplied async function `fn` that has a standard JS callback `(error: Error, result: any)` into a `Promise`, passing the supplied parameters. When `error` is set, the Promise is rejected, else the Promise resolves with the `result` value.

*__example__*: const promisify from '@polkadot/util/promisify');

await promisify(null, ((a, cb) => cb(null, a), true); // resolves with `true` await promisify(null, (cb) => cb(new Error('error!'))); // rejects with `error!`

**Parameters:**

| Param | Type |
| ------ | ------ |
| self | `any` |
| fn | `Function` |
| `Rest` params | `Array`<`any`> |

**Returns:** `Promise`<`any`>

___

