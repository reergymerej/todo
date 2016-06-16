'use babel';

class TodoView {
  constructor(serializedState) {
    this.renderItems = this.renderItems.bind(this);
    var header;
    this.element = document.createElement('todo');
    header = document.createElement('h1');
    header.textContent = 'TODO';
    this.itemContainer = document.createElement('item-container');
    this.element.appendChild(header);
    this.element.appendChild(this.createControls());
    this.element.appendChild(this.itemContainer);
  }

  createControls() {
    var controls, refresh;
    controls = document.createElement('controls');
    controls.classList.add('block');
    refresh = document.createElement('button');
    refresh.textContent = 'refresh';
    refresh.classList.add('btn');
    refresh.addEventListener('click', function() {
      return atom.emitter.emit('todo:refresh');
    });
    controls.appendChild(refresh);
    return controls;
  }

  emptyItems() {
    var child, results;
    results = [];
    while (child = this.itemContainer.lastChild) {
      results.push(this.itemContainer.removeChild(child));
    }
    return results;
  }

  renderItems(items) {
    var i, item, len, results;
    this.emptyItems();
    results = [];
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      results.push(this.addItem(item));
    }
    return results;
  }

  addItem(item) {
    var i, len, ref, todoItem, todoMatch;
    todoItem = document.createElement('todo-item');
    todoItem.appendChild(this.createSection(item));
    ref = item.matches;
    for (i = 0, len = ref.length; i < len; i++) {
      todoMatch = ref[i];
      todoItem.appendChild(this.addTodoText(todoMatch, item));
    }
    return this.itemContainer.appendChild(todoItem);
  }

  createSection(item) {
    var todoSection;
    todoSection = document.createElement('todo-section');
    todoSection.textContent = item.filePath;
    todoSection.classList.add('text-subtle');
    return todoSection;
  }

  addTodoText(todoMatch, item) {
    var me, todoText;
    me = this;
    todoText = document.createElement('todo-text');
    todoText.textContent = todoMatch.matchText;
    todoText.addEventListener('click', function() {
      return me.onItemClick(todoMatch, item);
    });
    return todoText;
  }

  onItemClick(item, section) {
    var initialColumn, initialLine, range;
    range = item.range && item.range[0];
    if (range) {
      initialLine = range[0];
      initialColumn = range[1];
      return atom.workspace.open(section.filePath, {
        initialLine: initialLine,
        initialColumn: initialColumn
      });
    }
  }

  serialize() {}

  destroy() {
    return this.element.remove();
  }

  getElement() {
    return this.element;
  }
}

export default TodoView;
