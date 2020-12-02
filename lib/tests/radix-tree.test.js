'use strict';

const Tree = require('../radix-tree');
const t = require('tap');
const test = t.test;

test('Constructor', t => {
  t.plan(1);

  t.test('create head node', t => {
    t.plan(1);
    const tree = new Tree();

    t.is(tree.HEAD.character, '*');
  });
});

test('Insert', t => {
  t.plan(2);

  t.test('insert word', t => {
    t.plan(3);

    const tree = new Tree();
    tree.insert('George');
    tree.insert('Kampitakis');

    t.is(tree.HEAD.toString(), '*:G,K');
    t.is(tree.HEAD.getChild('G').toString(), 'G:e');
    t.is(tree.HEAD.getChild('K').toString(), 'K:a');
  });

  t.test('mark node as completed', t => {
    t.plan(3);

    const tree = new Tree();
    tree.insert('gk');

    t.is(tree.HEAD.getChild('g').getChild('k').isCompleted, true);
    t.is(tree.HEAD.getChild('g').getChild('k').toString(), 'k*');
    tree.insert('gke');

    t.is(tree.HEAD.getChild('g').getChild('k').toString(), 'k*:e');
  });
});

test('delete', t => {
  t.plan(1);

  t.test('remove all chars', t => {
    t.plan(3);

    const tree = new Tree();
    tree.insert('car');
    tree.insert('carpet');

    tree.delete('carpet');
    tree.delete('ca');
    tree.delete('tree');

    t.is(tree.HEAD.getChild('c').getChild('a').getChild('r').isCompleted, true);
    t.is(tree.HEAD.getChild('c').getChild('a').getChild('r').hasChild('p'), false);
    t.is(tree.find('car'), true);
  });
});

test('find', t => {
  t.plan(2);

  t.test('return true if word exists', t => {
    t.plan(1);
    const tree = new Tree();
    tree.insert('car');

    t.is(tree.find('car'), true);
  });

  t.test('return false if word exists', t => {
    t.plan(2);
    const tree = new Tree();
    tree.insert('carpet');

    t.is(tree.find('car'), false);
    t.is(tree.find('tree'), false);
  });
});
