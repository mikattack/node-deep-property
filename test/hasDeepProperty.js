
var test = require('tap').test
  , hasDeepProperty = require('../index.js');


test('invalid input', function (t) {
  var a = undefined
    , b = { };
  t.equal(hasDeepProperty(a, 'sample'), false, 'Undefined property');
  t.equal(hasDeepProperty(b, undefined), false, 'Undefined object');
  t.end();
});


test('shallow properties', function (t) {
  var a = {
    sample:  true,
    example: false,
    unknown: undefined
  };
  t.equal(hasDeepProperty(a, 'example'), true);
  t.equal(hasDeepProperty(a, 'sample'), true);
  t.equal(hasDeepProperty(a, 'unknown'), true);
  t.equal(hasDeepProperty(a, 'invalid'), false);
  t.end();
});


test('deep properties', function (t) {
  var a = {
    b: { sample:true, example:{ type:'vegetable' }},
    c: { sample:true, example:{ type:'mineral' }},
  };
  t.equal(hasDeepProperty(a, 'b.example.type'), true);
  t.equal(hasDeepProperty(a, 'c.example.type'), true);
  t.equal(hasDeepProperty(a, 'c.gorky.type'), false);
  t.end();
});


test('properties on non-objects', function (t) {
  var fn  = function () { }
    , str = 'An example string'
    , num = 42;

  fn.path = { to: { property:true }};
  str.path = { to: { property:true }};
  num.path = { to: { property:true }};
  
  t.equal(hasDeepProperty(fn, 'path.to.property'), true);
  t.equal(hasDeepProperty(str, 'path.to.property'), false);
  t.equal(hasDeepProperty(num, 'path.to.property'), false);
  t.end();
});
