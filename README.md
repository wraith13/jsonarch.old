# Jsonarch

Jsonarch is JSON to JSON processor.

🚧 UNDER CONSTRUCTION 🚧

## Feature

- Secure meta programmable JSON
- Profiler ( systerm, code, data )
- Origin map ( code, data )
- Influence map ( code, data )
- Call graph ( code )

## Overview

```mermaid
graph LR;
    T[Template JSON];
    P[Parameter JSON];
    S[Setting JSON];
    T[Template JSON]-->J(Jsonarch);
    P[Parameter JSON]-->J(Jsonarch);
    S[Setting JSON]-->J(Jsonarch);
    subgraph R[Result JSON]
        M((Meta data));
        O[Output JSON];
    end
    J(Jsonarch)-->M((Meta data));
    J(Jsonarch)-->O[Output JSON];
```

|File|Description|
|---|---|
|Template JSON|Code|
|Parameter JSON|Data ( optional )|
|Setting JSON|Settings ( optional )|
|Result JSON|Output JSON with meta data( profile result, origin map, influence map, call graph, etc )|
|Output JSON|Generated JSON|

See [Jsonarch Reference](./document/reference.md) for details.

## How to use Jsonable as Command

```sh
jsonarch -t template.json -p parameter.json -s setting.json -r result.json -o output.json
```

See [Jsonarch Commandline Tool Reference](./document/commandline.md) for details.

## How to use Jsonable as Module

```ts
import { Jsonarch } from "jsonarch";

Jsonarch.process();
```

See [Jsonarch Module Reference](./document/module.md) for details.

## How to build

Requires: [Node.js](https://nodejs.org/), [TypeScript Compiler](https://www.npmjs.com/package/typescript)

`tsc -P ./source` or `tsc -P ./source -w`

## JSON Schemas

- [template.json JSON Schema](./json-schema/template-json-schema.json)
- [setting.json JSON Schema](./json-schema/setting-json-schema.json)

## Samples

- [Jsonarch Samples](./sample/index.md)

## References

- [Jsonarch Reference](./document/reference.md)
- [Jsonarch Module Reference](./document/module.md)
- [Jsonarch Commandline Tool Reference](./document/commandline.md)
- [Jsonarch Schema Reference](./document/schema.md)

## License

- [Boost Software License](LICENSE_1_0.txt)
