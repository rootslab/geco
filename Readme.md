### Geco

[![NPM VERSION](http://img.shields.io/npm/v/geco.svg?style=flat)](https://www.npmjs.org/package/geco)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/geco)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/c/rootslab/geco.svg?style=flat)](https://codeclimate.com/github/rootslab/geco)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/geco#mit-license)

![NODE VERSION](https://img.shields.io/node/v/geco.svg)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/geco.svg?style=flat)](http://travis-ci.org/rootslab/geco)
[![BUILD STATUS](http://img.shields.io/david/rootslab/geco.svg?style=flat)](https://david-dm.org/rootslab/geco)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/geco.svg?style=flat)](https://david-dm.org/rootslab/geco#info=devDependencies)

[![NPM MONTHLY](http://img.shields.io/npm/dm/geco.svg?style=flat)](http://npm-stat.com/charts.html?package=geco)
[![NPM YEARLY](https://img.shields.io/npm/dy/geco.svg)](http://npm-stat.com/charts.html?package=geco)
[![NPM TOTAL](https://img.shields.io/npm/dt/geco.svg)](http://npm-stat.com/charts.html?package=geco)

[![NPM GRAPH](https://nodei.co/npm/geco.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/geco/)

> __Geco__, a __CAT__ (Constant Amortized Time) __recursive generator*__ for __k-combinations__ chosen from a given set S of __n__ elements.

> It is __extremely__ memory efficient, it generates all the k-combinations in a set of __n elements__, using a __single sequence of n bits__, only __1 bit__ per element.

> __NOTE__: It generates combinations in __[Colexicographic Order](https://en.wikipedia.org/wiki/Lexicographical_order#Colexicographic_order)__.


### Table of Contents

- __[Install](#install)__
- __[Run Tests](#run-tests)__
- __[Run Benchmarks](#run-benchmarks)__
- __[Methods](#methods)__
    - __[gen](#gecogen)__
    - __[getbuff](#gecogetbuff)__
    - __[getbmap](#gecogetbmap)__
- __[Events](#events)__
- __[Examples](#examples)__
  - __[Simple Example](#examples)__
  - __[Cards Example](#examples)__
  - __[Cartesian Product](#examples)__
  - __[52-Card Deck Example](#examples)__
- __[MIT License](#mit-license)__

------------------------------------------------------------------------------

### Install

```bash
$ npm install geco [-g]
```

> __require__:

```javascript
var Geco  = require( 'geco' );
```

### Run Tests

> __to run all test files, install devDependencies:__

```bash
 $ cd geco/
 # install or update devDependencies
 $ npm install 
 # run tests
 $ npm test
```

> __to execute a single test file simply do__:

```bash
 $ node test/file-name.js
```

### Run Benchmarks

```bash
$ cd geco/
$ npm run bench
```

> __to execute a single bench file, simply do__:

```bash
 $ node bench/file-name.js
```

> __output example and running time__:

```bash
- generate all boards of 5 cards from a deck of 52, without repetition/replacement

- the 52-card deck is:
  A♠ K♠ Q♠ J♠ T♠ 9♠ 8♠ 7♠ 6♠ 5♠ 4♠ 3♠ 2♠ 
  A♣ K♣ Q♣ J♣ T♣ 9♣ 8♣ 7♣ 6♣ 5♣ 4♣ 3♣ 2♣ 
  A♦ K♦ Q♦ J♦ T♦ 9♦ 8♦ 7♦ 6♦ 5♦ 4♦ 3♦ 2♦ 
  A♥ K♥ Q♥ J♥ T♥ 9♥ 8♥ 7♥ 6♥ 5♥ 4♥ 3♥ 2♥

- generating 5-combinations..

....

- total: 2598960 combinations
- rate:  621760 comb/sec
- time:  4.18 secs

- generating all 7-combinations (133784560)..

....

- total: 133784580 combinations
- rate:  580687 comb/sec
- time:  230.39 secs

```

### Methods

> Arguments between [ ] are optional.

|            name         |                           description                            |
|:------------------------|:-----------------------------------------------------------------|
| __[gen](#gecogen)__     | `get a generator to produce combinations of k elements from a given set, without replacement`|
| __[getbuff](#gecogetbuff)__ | `..` |
| __[getbmap](#gecogetbmap)__ | `..` |


#### Geco.gen
> ##### get a k-combination of a given set, without replacement
```javascript
/*
 * get a generator for iterating on all combinations of k elements,
 * chosen from the first n items of the given set. Optionally, it
 * may uses also a bitmap, for generating combinations.
 *
 * NOTE: it consumes only n bytes in memory to generate all
 * combinations, instead, with bitmap, it uses only n bits.
 */
'gen' : function *( Number n, Number k, Array set [, Boolean bitmap ] ) : GeneratorFunction
```

#### Geco.getbuff
> ##### get a k-combination of n elements, as a buffer
```javascript
/*
 * the iterator's value is a Buffer with k bytes set to 1.
 */
'getbuff' : function ( Number n, Number k ) : GeneratorFunction
```

#### Geco.getbmap
> ##### get a k-combination of n elements, as a bitmap
```javascript
/*
 * the iterator's value is a bitmap with k bits set to 1.
 */
'getbmap' : function ( Number n, Number k ) : GeneratorFunction
```

### Examples

 > - __[Simple Example](example/next-example.js)__
 > - __[Cards Example](example/cards-example.js)__
 > - __[Cartesian Product](example/cartesian-product-example.js)__
 > - __[52-Card Deck Example](example/deck-example.js)__

> See __[examples](example/)__.


### MIT License

> Copyright (c) 2018-present &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
