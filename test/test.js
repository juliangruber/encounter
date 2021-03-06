var tape = require('tape');
var count = require('..');

test('down',          count().from(2),               [2, 1, 0]);
test('up',            count().to(2),                 [0, 1, 2]);
test('down negative', count().from(1).to(-1),       [1, 0, -1]);
test('up negative',   count().from(-1).to(1),       [-1, 0, 1]);
test('steps',         count().to(4).step(2),         [0, 2, 4]);
test('frac steps',    count().to(0.5).step(0.3), [0, 0.3, 0.5]);

tape('end', function(t) {
  var ticks = [];
  count()
    .every(1)
    .from(2)
    .start()
    .on('tick', function(tick) {
      ticks.push(tick);
      this.end();
    })
    .on('end', function() {
      t.deepEqual(ticks, [2]);
      t.end();
    });
});

tape('early end', function(t) {
  var ticks = [];
  count()
    .every(1)
    .from(2)
    .start()
    .end()
    .on('tick', function(tick) {
      t.fail();
    })
  process.nextTick(function() {
    t.ok(true, 'ended');
    t.end();
  });
});

function test (name, counter, res) {
  tape(name, function (t) {
    var ticks = [];
    counter.every(1).start()
    .on('tick', function (tick) { ticks.push(tick) })
    .on('end', function () {
      t.deepEqual(ticks, res, 'steps');
      t.end();
    })
  });
}
