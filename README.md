
# encounter

Flexible reliable counting. Solved once and for all.

## Usage

```js
var count = require('encounter');

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
count().from(10).on('tick', console.log);

// fast count up
count().to(10).every(100).on('tick', console.log);
```

`encounter` makes sure it stays in time even when the event loop is busy.

## API

### var count = encounter()

### count.from(val)

Start counting at `val`.

### count.to(val)

Count until `val`.

### count.step(val)

Progress the counter by `val` each step.

### count.every(val)

Progress the counter every `val` milliseconds.

### count.start()

Start counting.

### count.on('tick', fn)

Calls `fn` with the current tick value, starting from the initial value.

### count.on('end', fn)

Calls `fn` when `to` is reached.

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install encounter
```

## License

(MIT)
