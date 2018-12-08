

# Functions

<a id="isip"></a>

##  isIp

▸ **isIp**(value: *`string`*, type?: *`IpTypes`*): `boolean`

*Defined in [is/ip.ts:27](https://github.com/polkadot-js/common/blob/fbd6c1e/packages/util/src/is/ip.ts#L27)*

*__name__*: isIp

*__signature__*: isIp (value: string, type?: 'v4' | 'v6'): boolean

*__summary__*: Tests if the value is a valid IP address

*__description__*: Checks to see if the value is a valid IP address. Optionally check for either v4/v6

*__example__*:   

```javascript
import { isIp } from '@polkadot/util';

isIp('192.168.0.1')); // => true
isIp('1:2:3:4:5:6:7:8'); // => true
isIp('192.168.0.1', 'v6')); // => false
isIp('1:2:3:4:5:6:7:8', 'v4'); // => false
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |
| `Optional` type | `IpTypes` |

**Returns:** `boolean`

___

