'use strict';

const { suite, add, cycle, complete } = require('benny');
const RadixTree = require('./lib');
const uuid = require('uuid').v4;
const randomStrings = [];

for (let i = 0; i < 1000; i++) {
  randomStrings.push(uuid());
}

bench('Radix Tree Add', [
  {
    title: 'Add 100 strings',
    fn: function () {
      const tree = new RadixTree();

      for (let i = 0; i < 1000; i++) {
        tree.insert(randomStrings[i]);
      }
    }
  }

]);

bench('Radix Tree Find', [
  {
    title: 'Find 100 strings',
    fn: function () {
      const tree = new RadixTree();

      for (let i = 0; i < 1000; i++) {
        tree.insert(randomStrings[i]);
      }

      for (let i = 0; i < 1000; i++) {
        tree.find(randomStrings[i]);
      }
    }
  }
]);

bench('Radix Tree Delete', [
  {
    title: 'Delete 100 strings',
    fn: function () {
      const tree = new RadixTree();

      for (let i = 0; i < 1000; i++) {
        tree.insert(randomStrings[i]);
      }

      for (let i = 0; i < 1000; i++) {
        tree.delete(randomStrings[i]);
      }
    }
  }
]);

function bench (title, functions) {
  return suite(
    title,
    ...functions.map(({ title, fn }) => add(title, fn)),
    cycle(),
    complete()
  );
}

/**
 *
Running "Radix Tree Add" suite...
Progress: 100%

  Add 100 strings:
    149 ops/s, ±0.95%   | fastest

Finished 1 case!
Running "Radix Tree Find" suite...
Progress: 100%

  Find 100 strings:
    74 ops/s, ±0.99%   | fastest

Finished 1 case!
Running "Radix Tree Delete" suite...
Progress: 100%

  Delete 100 strings:
    102 ops/s, ±0.81%   | fastest

Finished 1 case!
 */
