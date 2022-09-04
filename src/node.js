import Connector from './connector.js';

let dragItem = null;
let dragMode = 0;

const beginNodeDrag = (node, x, y) => {
  if (dragMode != 0) return;

  dragMode = 1;
  dragItem = node;

  window.addEventListener('mousemove', onNodeDragMouseMove);
  window.addEventListener('mouseup', onNodeDragMouseUp);
}

const onNodeDragMouseUp = (e) => {
	e.stopPropagation();
  e.preventDefault();

	dragItem = null;
	dragMode = 0;

	window.removeEventListener('mousemove', onNodeDragMouseMove);
	window.removeEventListener('mouseup', onNodeDragMouseUp);
}

const onNodeDragMouseMove = (e) => {
	e.stopPropagation(); e.preventDefault();
	
  if (dragItem) {
	  dragItem.style.left = e.pageX + 'px';
	  dragItem.style.top = e.pageY + 'px';
	  // dragItem.ref.updatePaths();
	}
}

export default class Node {
  constructor(title) {
    this.title = title;
    this.inputs = [];
	  this.outputs = [];

    this.elRoot = document.createElement('div');
    this.elRoot.className = 'node';
    this.elRoot.ref = this;

    this.elHeader = document.createElement('header');
    this.elHeader.innerHTML = this.title;
    this.elHeader.addEventListener('mousedown', this.onHeaderDown);
    this.elRoot.append(this.elHeader);

    this.elList = document.createElement('ul');
    this.elRoot.append(this.elList);

    document.body.append(this.elRoot);
  }

  setPosition(x, y) {
    this.elRoot.style.left = x + 'px';
    this.elRoot.style.top = y + 'px';
  }

  setSize(width, height) { 
    this.elRoot.style.width = width + 'px';
    this.elRoot.style.height = height + 'px';
  }

  onHeaderDown(e) {
    e.stopPropagation();
    beginNodeDrag(e.target.parentNode, e.pageX, e.pageY);
  }

  addInput(name) {
    const connector = new Connector(this, name, true);
    this.elList.append(connector.elRoot);
    this.inputs.push(connector);
    return connector;
  }

  addOutput(name) {
    const connector = new Connector(this, name, false);
    this.elList.append(connector.elRoot);
    this.inputs.push(connector);
    return connector;
  }

  addField(name) {
    const li = document.createElement('li');
    const input = document.createElement('input');
    li.append(input);
    this.elList.append(li);
  }

  get width() {
    return this.elRoot.style.width;
  }

  get height() {
    return this.elRoot.style.height;
  }
}
