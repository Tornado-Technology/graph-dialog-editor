export default class Connector {
  constructor(node, name, direction) {
    this.node = node;
    this.name = name;

    this.elRoot = document.createElement('li');
    this.elRoot.className = (direction == true) ? 'input' : 'output';
    this.elRoot.ref = this;
    this.node.elRoot.append(this.elRoot);

    this.elDot = document.createElement('i');
    this.elDot.innerHTML = '&nbsp;';
    this.elRoot.append(this.elDot);

    this.elName = document.createElement('span');
    this.elName.innerHTML = name;
    this.elRoot.append(this.elName);
  }
}

export const direction = {
  input: 0,
  output: 1
}

