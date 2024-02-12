const fs = require('fs');
const path = require('path');

class TreeNode {
  constructor(fullPath) {
    this.path = fullPath;
    this.name = path.basename(fullPath);
    this.children = [];
  }

  buildTree() {
    const stack = [this];

    while (stack.length) {
      const currentNode = stack.pop();

      if (currentNode) {
        const children = fs.readdirSync(currentNode.path);

        for (const child of children) {
          const childPath = path.join(currentNode.path, child);
          const childNode = new TreeNode(childPath);
          currentNode.children.push(childNode);

          if (fs.statSync(childNode.path).isDirectory()) {
            stack.push(childNode);
          }
        }
      }
    }
  }
}

module.exports = TreeNode;