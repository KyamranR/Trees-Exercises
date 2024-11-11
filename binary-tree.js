/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    let queue = [{ node: this.root, depth: 1 }]; // Initialize queue with root node at depth 1

    while (queue.length > 0) {
      let { node, depth } = queue.shift();

      if (!node.left && !node.right) {
        return depth;
      }

      if (node.left) queue.push({ node: node.left, depth: depth + 1 });
      if (node.right) queue.push({ node: node.right, depth: depth + 1 });
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    let queue = [this.root];
    let depth = 0;

    while (queue.length > 0) {
      let levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        let currentNode = queue.shift();

        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }
      depth++;
    }

    return depth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = 0;

    function findMaxPathSum(node) {
      if (!node) return 0;

      let leftMax = Math.max(findMaxPathSum(node.left), 0);
      let rightMax = Math.max(findMaxPathSum(node.right), 0);

      let currentPathSum = node.val + leftMax + rightMax;

      maxSum = Math.max(maxSum, currentPathSum);

      return node.val + Math.max(leftMax, rightMax);
    }

    findMaxPathSum(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let queue = [this.root];
    let nextLargerValue = null;

    while (queue.length > 0) {
      let currentNode = queue.shift();

      if (
        currentNode.val > lowerBound &&
        (nextLargerValue === null || currentNode.val < nextLargerValue)
      ) {
        nextLargerValue = currentNode.val;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return nextLargerValue;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) return false;
    if (node1 === this.root || node2 === this.root) return false;

    let queue = [[this.root, null]];

    while (queue.length > 0) {
      let levelSize = queue.length;
      let node1Parent = null;
      let node2Parent = null;

      for (let i = 0; i < levelSize; i++) {
        let [currentNode, parent] = queue.shift();

        if (currentNode === node1) node1Parent = parent;
        if (currentNode === node2) node2Parent = parent;

        if (currentNode.left) queue.push([currentNode.left, currentNode]);
        if (currentNode.right) queue.push([currentNode.right, currentNode]);
      }

      if (node1Parent && node2Parent) {
        return node1Parent !== node2Parent;
      }

      if ((node1Parent && !node2Parent) || (!node1Parent && node2Parent)) {
        return false;
      }
    }
    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
