# encounter

Flexible reliable counting. Uses [periodic](https://github.com/juliangruber/periodic) to stay on time.

[![Build Status](https://travis-ci.org/juliangruber/encounter.png)](https://travis-ci.org/juliangruber/encounter)

[![browser support](https://ci.testling.com/juliangruber/encounter.png)](https://ci.testling.com/juliangruber/encounter)

## Usage

```js
var count = require('encounter');

// count from -2 to 2 in steps of 0.1 every 100 ms
count()
  .from(-2)
  .to(2)
  .step(0.1)
  .every(100)
  .start()
  .on('tick', function (val) {
    console.log('tick: ' + val);
  })
  .on('end', function () {
    console.log('counting ended');
  });
```

`encounter` has sensible defaults, so the common use cases are easy:

```js
// count down
count().from(10).start().on('tick', console.log);

// fast count up
count().to(10).every(100).start().on('tick', console.log);
```

`encounter` makes sure it stays in time even when the event loop is busy.

## API

### var count = encounter()

### count.from(val)

Start counting at `val`. Defaults to `0`.

### count.to(val)

Count until `val`. Defaults to `0`.

### count.step(val)

Progress the counter by `val` each step. Defaults to `1`.

### count.every(val)

Progress the counter every `val` milliseconds. Defaults to `1000`.

### count.start()

Start counting.

### count.end()

End counting.

### count.on('tick', fn)

Calls `fn` with the current tick value, starting from the initial value.

### count.on('end', fn)

Calls `fn` when `to` is reached.

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install encounter
```

Alternatively, with [component](http://component.io) do

```bash
$ component install juliangruber/encounter
```

## License

(MIT)
