var EventEmitter = require('events').EventEmitter;
var periodic = require('periodic');
var inherits;
try { inherits = require('util').inherits } catch (_) { inherits = require('inherit') }

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
  var tick = 0;

  setTimeout(function () {
    periodic(self._every).on('tick', function () {
      if (tick >= ticks) {
        this.end();
        self.emit('tick', self._to);
        return self.emit('end');
      }

      self.emit('tick', self._from + reverse * tick++ * self._step);
    });
  })

  return self;
}
