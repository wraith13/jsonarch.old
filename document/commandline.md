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
|default|net, local, system, stdin|[Template JSON](./reference.md#template-json) ( required ).|
|`-p`|net, local, system, stdin|[Parameter JSON](./reference.md#parameter-json) ( optional ).|
|`-c`|local, stdin|[Cache JSON](./reference.md#cache-json) ( optional ).|
|`-s`|net, local, system, stdin|[Setting JSON](./reference.md#setting-json) ( optional ).|
|`-r`|local, stdout, stderr|[Result JSON](./reference.md#result-json) ( optional ). Overwrite existing files without confirmation.|
|`-o`|local, stdout, stderr|[Output JSON](./reference.md#output-json) ( optional ). Overwrite existing files without confirmation.|

If both `-r` and `-o` are not specified, Result JSON will be outputed to stdout.

|File Type|Format|Description|
|---|---|---|
|stdin|`std:in`|stdin|
|stdout|`std:out`|stdout|
|stderr|`std:err`|stderr|
|net|`http://` *, `https://` *,|ddddd|
|system|`system:` *|ddddd|
|local|(default)|ddddd|

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
