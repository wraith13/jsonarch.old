# Jsonarch Commandline Tool Reference

Requires: [Node.js](https://nodejs.org/)

## How to install for command

You need to run this command with administrator privileges.

```sh
npm install jsonarch -g
```

## Process

```sh
jsonarch template.json -p parameter.json -s setting.json -r result.json -o output.json
```

|Option|Description|
|---|---|
|default|Template JSON ( required ).|
|`-p`|Parameter JSON ( optional ).|
|`-s`|Setting JSON ( optional ).|
|`-r`|Result JSON ( optional ). Overwrite existing files without confirmation.|
|`-o`|Output JSON ( optional ). Overwrite existing files without confirmation.|

If both `-r` and `-o` are not specified, Result JSON will be outputed to stdout.

## Version

```sh
jsonarch -v
```
