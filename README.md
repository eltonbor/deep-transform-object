# deep-transform-object
Performs a deep transformation on complex nested objects and arrays

## Install
```sh
npm i deep-transform-object
```

```js
const deepTransform = require('deep-transform-object')

// Complex nested objects
const complexNestedObject = {
    transactions: [
        { 
            id: 1,
            amounts: [
                { value: 10 },
                { value: 20 },
            ]
        },
        { 
            id: 2,
            // amounts: undefined
        },
        { 
            id: 3,
            amounts: [
                { value: 30 },
                { value: 40 },
            ]
        }
    ]
}

// Converts all `values` keys to string
const initialValue = 0
const transformer = (val) => String(val))
const path = 'transactions.amounts.value'
const sum = deepTransform(complexNestedObject, transformer, path)
// sum = 100
```


## API
`deepTransform` takes 4 arguments. 3 mandatory and 1 optional:

```ts
deepTransform (
    collection: object|array,
    transformer: (currentValue: any) => any, // MUST RETURN THE TRANSFORMED OBJECT
    path: string,
    context: any
): any
```

### Arguments
- `collection` Object or Array to traverse.
- `transformer` Function to call with every value in `obj`-tree. See section below
  for [`transformer` function signature](#arguments-for-transformer-function).
- `path` Path to the inner property of collection to be transformed.
- `context` (optional) Bound to transformer as `this`.

### Arguments for transformer function
The transformer function is called with these arguments:

```ts
(value: any) => any
```

- `value` Value of current path.
- MUST RETURN THE TRANSFORMED VALUE


## Development
```sh
git clone https://github.com/eltonbor/deep-transform-object.git
cd deep-transform-object
npm install
npm test  # runs node index.test.js
```

## Inspired on
https://github.com/kmalakoff/reduce-deep


## License
MIT © 2022 Elton Tasca Borssoi