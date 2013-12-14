var EventEmitter = require('events').EventEmitter;
var periodic = require('periodic');

module.exports = Encounter;

function Encounter () {
  if (!(this instanceof Encounter)) return new Encounter();
  EventEmitter.call(this);
  this.from(0);
  this.to(0);
  this.step(1);
  this.every(1000);
}

inherits(Encounter, EventEmitter);

Encounter.prototype.from = function (val) {
  this._from = val;
  return this;
};

Encounter.prototype.to = function (val) {
  this._to = val;
  return this;
};

Encounter.prototype.step =
Encounter.prototype.steps = function (val) {
  this._step = val;
  return this;
};

Encounter.prototype.every = function (val) {
  this._every = val;
  return this;
};

Encounter.prototype.start = function () {
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
};

function inherits (a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
