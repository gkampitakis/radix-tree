# Radix Tree

Implementation of Radix Tree in JS.

From [Wikipedia](https://en.wikipedia.org/wiki/Radix_tree)

> In computer science, a radix tree (also radix trie or compact prefix tree) is a data structure that represents a space-optimized trie (prefix tree) in which each node that is the only child is merged with its parent. The result is that the number of children of every internal node is at most the radix r of the radix tree, where r is a positive integer and a power x of 2, having x ≥ 1. Unlike regular trees, edges can be labeled with sequences of elements as well as single elements. This makes radix trees much more efficient for small sets (especially if the strings are long) and for sets of strings that share long prefixes.

## Usage

```bash
# install dependencies
npm install

# run tests
npm test
```

## Resources

-   [Youtube Video](https://www.youtube.com/watch?v=zIjfhVPRZCg&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=7&t=0s)
-   [Javascript Algorithms](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/trie)
