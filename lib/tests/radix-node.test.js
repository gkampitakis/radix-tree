'use strict';

const RadixNode = require('../radix-node');
const t = require('tap');
const test = t.test;

test('Constructor', t => {
  t.plan(2);

  t.test('Default values', t => {
    t.plan(3);
    const node = new RadixNode('c');

    t.is(node.character, 'c');
    t.is(node.isCompleted, false);
    t.is(node.children instanceof Map, true);
  });

  t.test('Default values', t => {
    t.plan(3);
    const node = new RadixNode('c', true);

    t.is(node.character, 'c');
    t.is(node.isCompleted, true);
    t.is(node.children instanceof Map, true);
  });
});

test('addChild', t => {
  t.plan(2);

  t.test('add a character', t => {
    t.plan(2);

    const node = new RadixNode('c');
    const child = node.addChild('a');

    t.is(child.character, 'a');
    t.is(child.isCompleted, false);
  });

  t.test('update existing character', t => {
    t.plan(3);

    const node = new RadixNode('c');
    node.addChild('a');
    const child = node.addChild('a', true);

    t.is(child.character, 'a');
    t.is(child.isCompleted, true);
    t.is(node.children.size, 1);
  });
});

test('removeChild', t => {
  t.plan(4);

  t.test('return if not found', t => {
    t.plan(2);

    const node = new RadixNode('c');
    node.addChild('b');
    const result = node.removeChild('c');

    t.deepEqual(result, node);
    t.is(node.children.size, 1);
  });

  t.test('cannot deleted node if has children', t => {
    t.plan(1);

    const node = new RadixNode('c');
    node.addChild('a');
    node.addChild('b', true);
    node.removeChild('b');

    t.is(node.children.size, 2);
  });

  t.test('cannot deleted node if has children', t => {
    t.plan(1);

    const node = new RadixNode('c');
    node.addChild('a');
    node.addChild('b').addChild('t');
    node.removeChild('b');

    t.is(node.children.size, 2);
  });

  t.test('return deleted node', t => {
    t.plan(1);

    const node = new RadixNode('c');
    node.addChild('a');
    node.addChild('b');
    node.removeChild('b');

    t.is(node.children.size, 1);
  });
});

test('hasChild', t => {
  t.plan(2);

  t.test('return undefined', t => {
    t.plan(1);
    const node = new RadixNode('c');

    node.addChild('d');

    t.is(node.hasChild('b'), false);
  });

  t.test('return child', t => {
    t.plan(1);
    const node = new RadixNode('c');

    node.addChild('d');

    t.is(node.hasChild('d'), true);
  });
});

test('suggestChildren', t => {
  t.plan(1);

  t.test('return children characters', t => {
    t.plan(1);
    const node = new RadixNode('c');

    node.addChild('a');
    node.addChild('b');
    node.addChild('c');
    node.addChild('d');

    t.deepEqual(node.suggestChildren(), ['a', 'b', 'c', 'd']);
  });
});

test('toString', t => {
  t.plan(1);

  t.test('print string representation', t => {
    t.plan(2);
    const node = new RadixNode('c', true);
    node.addChild('a');
    node.addChild('b');
    node.addChild('c');
    node.addChild('d');

    t.is(node.toString(), 'c*:a,b,c,d');
    t.is(node.getChild('b').toString(), 'b');
  });
});
