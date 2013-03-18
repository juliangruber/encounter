var tap = require('tap');
var count = require('..');

test('down',          count().from(2),               [2, 1, 0]);
test('up',            count().to(2),                 [0, 1, 2]);
test('down negative', count().from(1).to(-1),       [1, 0, -1]);
test('up negative',   count().from(-1).to(1),       [-1, 0, 1]);
test('steps',         count().to(4).step(2),         [0, 2, 4]);
test('frac steps',    count().to(0.5).step(0.3), [0, 0.3, 0.5]);
// test('every');

tap.test('extend', function (t) {
  t.ok(count.encounter);
  t.end();
});

tap.test('alias', function (t) {
  t.equal(count().step, count().steps);
  t.end();
});

function test (name, counter, res) {
  tap.test(name, function (t) {
    var ticks = [];
    counter.every(1).start()
    .on('tick', ticks.push.bind(ticks))
    .on('end', function () {
      t.similar(ticks, res);
      t.end();
    })
  });
}
