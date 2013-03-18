var count = require('..');

count()
  .from(-2)
  .to(2)
  .step(0.1)
  .every(100)
  .start()
  .on('tick', console.log);
