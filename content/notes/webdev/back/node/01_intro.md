---
title: Intro and Basics
weight: 1
type: docs
---

## Introduction

### Differences between to the browser and NodeJS

| Browser | NodeJS |
| DOM | No Dom |
| Window | No Window |
| Interactive Apps | Server Side Apps |
| No Filesystem | Filesystem |
| Fragmentation | Versions |
| ES6 Modules | CommonJS |

### How to get Node to evaluate our code

**REPL (Read, Eval, Print Loop)**

```console
$ node
Welcome to Node.js v16.9.1.
Type ".help" for more information.
>
```

**CLI executable**

```console
$ node 00_app.js
large number
hey it is my first node app
```

## Globals

Some global variables available

- **\_\_dirname**: path of current directory
- **\_\_filename**
- **require**: function to use modules
- **module**: info about current module
- **process**: info about the environment where the program is bein executed

Note that in Node there is no **window** object like in Javascript.
