'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';

class TodoView {
  constructor(serializedState) {
    this.renderItems = this.renderItems.bind(this);
    this.openFile = this.openFile.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onClose = this.onClose.bind(this);

    this.element = document.createElement('todo');
    this._render([], true);
  }

  _render(items = [], loading = false) {
    ReactDOM.render(
      <Container
        onRefresh={this.onRefresh}
        onClose={this.onClose}
        onItemClick={this.openFile}
        items={items}
        loading={loading}
      />,
      this.element
    );
  }

  onRefresh() {
    this._render([], true);
    return atom.emitter.emit('todo:refresh');
  }

  onClose() {
    this._render([], false);
    return atom.emitter.emit('todo:close');
  }

  renderItems(items) {
    this._render(items, false);
  }

  openFile(filePath, range = []) {
    const rangeStart = range[0];

    if (filePath && rangeStart) {
      const initialLine = rangeStart[0];
      const initialColumn = rangeStart[1];

      return atom.workspace.open(filePath, {
        initialLine,
        initialColumn,
      });
    }
  }

  serialize() {}

  destroy() {
    ReactDOM.unmountComponentAtNode(this.element);
    return this.element.remove();
  }

  getElement() {
    return this.element;
  }
}

export default TodoView;
