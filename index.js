var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

module.exports = function () {
  return new encounter();
}

module.exports.encounter = encounter;

function encounter () {
  EventEmitter.call(this);
  this.from(0);
  this.to(0);
  this.step(1);
  this.every(1000);
}

inherits(encounter, EventEmitter);

encounter.prototype.from = function (val) { this._from = val; return this; }
encounter.prototype.to = function (val) { this._to = val; return this; }
encounter.prototype.step = function (val) { this._step = val; return this; }
encounter.prototype.steps = encounter.prototype.step;
encounter.prototype.every = function (val) { this._every = val; return this; }

encounter.prototype.start = function () {
  var self = this;

  var reverse = self._to < self._from
    ? -1
    : 1;

  var ticks = reverse * (self._to - self._from) / self._step;
  var start = +new Date();
  var tick = 0;

  function update () {
    if (tick >= ticks) {
      self.emit('tick', self._to);
      return self.emit('end');
    }

    self.emit('tick', self._from + reverse * tick * self._step);

    var dt = (start + self._every * ++tick) - +new Date();
    if (dt < 0) dt = 0;
    setTimeout(update, dt);
  }

  setTimeout(update);

  return self;
}
