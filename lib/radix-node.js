'use strict';

class RadixNode {
  constructor (character, isCompleted = false) {
    this.character = character;
    this.isCompleted = isCompleted;
    this.children = new Map();
  }

  getChild (character) {
    return this.children.get(character);
  }

  addChild (character, isCompleted = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new RadixNode(character, isCompleted));
    }

    const childNode = this.children.get(character);

    childNode.isCompleted = childNode.isCompleted || isCompleted;

    return childNode;
  }

  removeChild (character) {
    const childNode = this.getChild(character);

    if (
      childNode &&
      !childNode.isCompleted &&
      !childNode.hasChildren()
    ) {
      this.children.delete(character);
    }

    return this;
  }

  hasChildren () {
    return !!this.children.size;
  }

  hasChild (character) {
    return this.children.has(character);
  }

  suggestChildren () {
    return [...this.children.keys()];
  }

  toString () {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleted ? '*' : '';

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}

module.exports = RadixNode;
