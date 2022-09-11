# Jsonarch

Jsonarch is JSON to JSON processor.

🚧 UNDER CONSTRUCTION 🚧

## How to use Jsonable as Command

```sh
jsonarch -t template.json -p parameter.json -s setting.json -r result.json -o output.json
```

## How to use Jsonable as Module

```ts
import { Jsonarch } from "jsonarch";

Jsonarch.compile();
```

## How to build

requires: [Node.js](https://nodejs.org/), [TypeScript Compiler](https://www.npmjs.com/package/typescript)

`tsc -P ./source` or `tsc -P ./source -w`

## JSON Schemas

- [template.json JSON Schema](./json-schema/template-json-schema.json)
- [setting.json JSON Schema](./json-schema/setting-json-schema.json)

## Samples

- [Jsonarch Samples](./sample/index.md)

## References

- [Jsonarch Reference](./document/reference.md)
- [Jsonarch Commandline Tool Reference](./document/commandline.md)
- [Jsonarch Schema Reference](./document/schema.md)

## License

- [Boost Software License](LICENSE_1_0.txt)
