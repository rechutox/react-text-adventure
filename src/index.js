import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import { NODE_TYPES } from "./engine";
import { data, nodes } from "./story";

function TextNode({ node = {}, onNext = () => {}, visited = false }) {
  let classes = "box";
  if (visited) classes += " visited";
  let button = visited ? null : (
    <button className="button" onClick={onNext}>
      {node.buttonText || "Next"}
    </button>
  );
  return (
    <div className={classes}>
      <div className="body">{node.body}</div>
      <div className="buttons">{button}</div>
    </div>
  );
}

function ChoiceNode({ node = {}, onChoose = () => {}, visited = false }) {
  let classes = "box";
  if (visited) classes += " visited";
  let buttons = node.choices.map((choice, i) => (
    <button
      className={"button" + (node.selected === choice.id ? " choosen" : "")}
      key={i}
      onClick={() => onChoose(choice.id, choice.next)}
      disabled={visited}
    >
      {choice.title}
    </button>
  ));
  return (
    <div className={classes}>
      <div className="body">{node.body}</div>
      <div className="buttons">{buttons}</div>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      nodes,
      node: nodes["start"],
      history: []
    };
  }
  componentDidMount() {
    let node = this.state.node;
    if (node != null) node.onEnter();
  }
  componentDidUpdate() {
    // window.scrollBy(0, -window.innerHeight);
  }
  goto = (nodeName, data = {}) => {
    if (nodeName == null) return;

    let prevNode = this.state.node;
    if (prevNode == null) return;
    prevNode.onExit();

    let node = this.state.nodes[nodeName];
    if (node != null) node.onEnter();

    let history = [...this.state.history, { ...prevNode, ...data }];

    this.setState({ ...this.state, node, history });
  };
  next = () => {
    let prevNode = this.state.node;
    if (prevNode == null) return;
    this.goto(prevNode.next);
  };
  handleChoice = (choiceID, next) => {
    this.goto(next, { selected: choiceID });
  };
  renderNode(node, params = {}) {
    switch (node.type) {
      case NODE_TYPES.TEXT:
        return <TextNode node={node} onNext={this.next} {...params} />;
      case NODE_TYPES.CHOICE:
        return (
          <ChoiceNode node={node} onChoose={this.handleChoice} {...params} />
        );
      default:
        return <TextNode node={node} onNext={this.next} {...params} />;
    }
  }
  render() {
    let history = this.state.history
      .map((node, i) => this.renderNode(node, { key: i, visited: true }))
      .reverse();
    let node = this.renderNode(this.state.node);
    return (
      <div className="App">
        <h1 class="title">Gotta' Pee!</h1>
        {node}
        {history}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
