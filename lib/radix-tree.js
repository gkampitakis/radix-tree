'use strict';

const Node = require('./radix-node');
const HEAD_CHARACTER = '*';

class RadixTree {
  constructor () {
    this.HEAD = new Node(HEAD_CHARACTER);
  }

  insert (word) {
    const words = word.split('');
    let currentNode = this.HEAD;
    for (let i = 0; i < words.length; i++) {
      const isCompleted = i === words.length - 1;
      currentNode = currentNode.addChild(words[i], isCompleted);
    }

    return this;
  }

  delete (word) {
    function depthFirstDelete (currentNode, index = 0) {
      if (index >= word.length) {
        return;
      }

      const character = word[index];
      const nextNode = currentNode.getChild(character);

      if (nextNode === null) {
        return;
      }

      depthFirstDelete(currentNode, index++);

      if (index === word.length - 1) {
        nextNode.isCompleted = false;
      }

      currentNode.removeChild(character);
    }

    depthFirstDelete(this.HEAD);

    return this;
  }

  find (word) {
    const node = this.__getLastCharacterNode(word);

    return !!node && node.isCompleted;
  }

  __getLastCharacterNode (word) {
    const chars = word.split('');
    let currentNode = this.HEAD;

    for (let i = 0; i < chars.length - 1; i++) {
      currentNode = currentNode.getChild(chars[i]);

      if (!currentNode) return null;
    }

    return currentNode;
  }

  // print tree
}

module.exports = RadixTree;
