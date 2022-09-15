# Jsonarch Commandline Tool Reference

Requires: [Node.js](https://nodejs.org/)

## How to install for command

You need to run this command with administrator privileges.

```sh
npm install jsonarch -g
```

## Process

```sh
jsonarch template.json -p parameter.json -c cache.json -s setting.json -r result.json -o output.json
```

|Option|File Type|Description|
|---|---|---|
|default|Net, Local, JSON, System|[Template JSON](./reference.md#template-json) ( required ).|
|`-p`|Net, Local, JSON, System|[Parameter JSON](./reference.md#parameter-json) ( optional ).|
|`-c`|Local|[Cache JSON](./reference.md#cache-json) ( optional ).|
|`-s`|Net, Local, JSON, System|[Setting JSON](./reference.md#setting-json) ( optional ).|
|`-r`|Local|[Result JSON](./reference.md#result-json) ( optional ). Overwrite existing files without confirmation.|
|`-o`|Local|[Output JSON](./reference.md#output-json) ( optional ). Overwrite existing files without confirmation.|

If both `-r` and `-o` are not specified, Result JSON will be outputed to stdout.

|File Type|Format|Description|
|---|---|---|
|Net|`http://` *, `https://` *,|ddddd|
|JSON|`{` * `}`,|ddddd|
|System|`system:` *|ddddd|
|Local|(default)|ddddd|

|System File|Description|
|---|---|
|`system:boot-setting.json`|ddddd|
|`system:default-setting.json`|ddddd|
|`system:static-code-analysis.arch.json`|ddddd|
|`system:make-parameter-json-schema.arch.json`|make Parameter JSON Schema|
|`system:javascript-transpiler.arch.json`|Jsonarch to JavaScript transpiler|
|`system:typescript-transpiler.arch.json`|Jsonarch to TypeScript transpiler|

## Version

```sh
jsonarch -v
```
