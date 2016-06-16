'use babel';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Controls from './components/Controls';
import List from './components/List';

function Container(props) {
  return (
    <div>
      <Header />
      <Controls onRefresh={props.onRefresh} />
      <List
        items={props.items}
        onItemClick={props.onItemClick}
      />
    </div>
  );
}

Container.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

class TodoView {
  constructor(serializedState) {
    this.renderItems = this.renderItems.bind(this);
    this.openFile = this.openFile.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.element = document.createElement('todo');
    this._render();
  }

  _render(items = []) {
    ReactDOM.render(
      <Container
        onRefresh={this.onRefresh}
        items={items}
        onItemClick={this.openFile}
      />,
      this.element
    );
  }

  onRefresh() {
    return atom.emitter.emit('todo:refresh');
  }

  renderItems(items) {
    this._render(items);
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
