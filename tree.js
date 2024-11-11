/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;

    let stack = [this.root];
    let total = 0;

    while (stack.length) {
      let currentNode = stack.pop();
      total += currentNode.val;

      for (let child of currentNode.children) {
        stack.push(child);
      }
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    let queue = [this.root];
    let count = 0;

    while (queue.length > 0) {
      let currentNode = queue.shift();

      if (currentNode.val % 2 === 0) count++;

      for (let child of currentNode.children) {
        queue.push(child);
      }
    }
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    let queue = [this.root];
    let count = 0;

    while (queue.length > 0) {
      let currentNode = queue.shift();

      if (currentNode.val > lowerBound) count++;

      for (let child of currentNode.children) {
        queue.push(child);
      }
    }
    return count;
  }
}

module.exports = { Tree, TreeNode };
