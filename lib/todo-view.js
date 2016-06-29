'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';

class TodoView {
  constructor(/*serializedState*/) {
    this.renderItems = this.renderItems.bind(this);
    this.openFile = this.openFile.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onClose = this.onClose.bind(this);

    this.element = document.createElement('todo');
    this.state = {
      items: [],
      loading: false,
      pathsSearched: undefined,
    };
    this._render();

    atom.emitter.on('todo:pathSearched', this.onPathsSearched.bind(this));
  }

  setState(state) {
    Object.assign(this.state, state);
    this._render();
  }

  _render() {
    const {state} = this;

    ReactDOM.render(
      <Container
        onRefresh={this.onRefresh}
        onClose={this.onClose}
        onItemClick={this.openFile}
        items={state.items}
        loading={state.loading}
        pathsSearched={state.pathsSearched}
      />,
      this.element
    );
  }

  onPathsSearched(pathsSearched) {
    this.setState({ pathsSearched });
  }

  onRefresh() {
    this.setState({
      items: [],
      loading: true,
    });
    return atom.emitter.emit('todo:refresh');
  }

  onClose() {
    // this.setState({
    //   items: [],
    //   loading: false,
    // });
    return atom.emitter.emit('todo:close');
  }

  renderItems(items) {
    this.setState({
      items,
      loading: false,
    });
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

  toggle(visible) {
    return visible
    ? this._render()
    : ReactDOM.unmountComponentAtNode(this.element);
  }
}

export default TodoView;
