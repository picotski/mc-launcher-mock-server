const fs = require('fs');
const path = require('path');

class TreeNode {
  #serverPath;
  name;
  path;
  children;

  constructor(fullPath, currentPath) {
    this.#serverPath = fullPath;
    this.name = path.basename(fullPath);
    if (currentPath) {
      this.path = path.join(currentPath, this.name);
    } else {
      this.path = path.join(this.name, this.#serverPath.split(this.name)[1]);
    }
    this.children = [];
  }

  buildTree() {
    const stack = [this];

    while (stack.length) {
      const currentNode = stack.pop();

      if (currentNode) {
        const children = fs.readdirSync(currentNode.#serverPath);

        for (const child of children) {
          const childPath = path.join(currentNode.#serverPath, child);
          const childNode = new TreeNode(childPath, currentNode.path);
          currentNode.children.push(childNode);

          if (fs.statSync(childNode.#serverPath).isDirectory()) {
            stack.push(childNode);
          }
        }
      }
    }
  }
}

module.exports = TreeNode;