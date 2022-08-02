//console.log(arguments);

// modele.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(4,4));

// exports
//const calc2 = require('./test-module-2');
const { add, multiply } = require('./test-module-2');
console.log(multiply(2, 5));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

