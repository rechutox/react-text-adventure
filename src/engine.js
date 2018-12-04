function getNode(path = "", root = {}) {
  if (path == null) return null;
  let labels = path.split(".");
  let node = root;
  for (let i in labels) {
    let label = labels[i];
    node = root[label] || null;
    if (node === null) {
      console.error(`The path "${path}" leads to nothing at ${label}`);
      break;
    }
  }
  return node;
}

export const NODE_TYPES = { TEXT: "TEXT", CHOICE: "CHOICE" };

export class Node {
  constructor({
    type,
    title,
    onEnter,
    onExit,
    body,
    next,
    choices,
    buttonText
  }) {
    this.type = type;
    this.title = title;
    this.onEnter = onEnter || (() => {});
    this.onExit = onExit || (() => {});
    this.body = body || "";
    this.next = next || null;
    this.buttonText = buttonText || null;
    this.choices = choices || {};
  }
}

export class Story {
  constructor({ title, data, functions, nodes, currentNode }) {
    this.title = title || "Untitled Story";
    this.data = data || {};
    this.functions = functions || {};
    this.nodes = nodes || {};
  }
}

export class Engine {
  constructor() {
    this.story = null;
    this.currentNode = null; // The node we are currently in
  }
  loadStory(story) {
    this.story = story;
    this.currentNode = story.nodes.start;
  }
  goToNode(path) {
    this.currentNode = getNode(path, this.story.nodes);
  }
  nextNode(choice = "") {
    if (this.currentNode == null) return;
    let nextNode = this.currentNode.nextNode;
    if (nextNode.type === "text")
      this.currentNode = getNode(nextNode, this.story.nodes);
    else if (nextNode.type === "choice")
      this.currentNode = getNode(nextNode.choices[choice], this.story.nodes);
  }
  renderCurrentNode() {
    if (this.currentNode) return this.currentNode.body;
    return "--- THE END ---";
  }
}
