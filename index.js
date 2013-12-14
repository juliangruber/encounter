var EventEmitter = require('events').EventEmitter;
var periodic = require('periodic');
var inherits = require('./lib/inherits');

module.exports = Encounter;

/**
 * Create a counter.
 *
 * @return {Encounter}
 * @api public
 */

function Encounter() {
  if (!(this instanceof Encounter)) return new Encounter();
  EventEmitter.call(this);
  this.from(0);
  this.to(0);
  this.step(1);
  this.every(1000);
}

inherits(Encounter, EventEmitter);

/**
 * Start counting from `num`.
 *
 * @param {Number} num
 * @return {Encounter}
 * @api public
 */

Encounter.prototype.from = function(num) {
  this._from = num;
  return this;
};

/**
 * End counting at `num`.
 *
 * @param {Number} num
 * @return {Encounter}
 * @api public
 */

Encounter.prototype.to = function(num) {
  this._to = num;
  return this;
};

/**
 * Step `size`.
 *
 * @param {Number} size
 * @return {Encounter}
 * @api public
 */

Encounter.prototype.step = function(size) {
  this._step = size;
  return this;
};

/**
 * Progress every `x` milliseconds.
 *
 * @param {Number} int
 * @return {Encounter}
 * @api public
 */

Encounter.prototype.every = function(x) {
  this._every = x;
  return this;
};

/**
 * Start counting.
 *
 * @return {Encounter}
 * @api public
 */

Encounter.prototype.start = function() {
  var self = this;

  var reverse = self._to < self._from
    ? -1
    : 1;

  var ticks = reverse * (self._to - self._from) / self._step;
  var tick = 0;

  self.timeout = setTimeout(function () {
    delete self.timeout;
    self.periodic = periodic(self._every);
    self.periodic.on('tick', function () {
      if (tick >= ticks) {
        this.end();
        self.emit('tick', self._to);
        return self.emit('end');
      }

      self.emit('tick', self._from + reverse * tick++ * self._step);
    });
  });

  return self;
};

/**
 * End counting.
 *
 * @return {Encounter}
 * @api public
 */

Encounter.prototype.end = function() {
  if (this.periodic) this.periodic.end();
  if (this.timeout) clearTimeout(this.timeout);
  this.emit('end');
  return this;
};
