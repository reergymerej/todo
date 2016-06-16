'use babel';

import service from './service';
import TodoView from './todo-view';
import {CompositeDisposable} from 'atom';

const Todo = {
  todoView: null,
  panel: null,
  subscriptions: null,

  config: {
    a_pattern: {
      title: 'RegExp Pattern',
      description: 'used in conjunction with RegExp Flags to find todo items in your code',
      type: 'string',
      default: 'TODO\\:.+',
    },
    b_flags: {
      title: 'RegExp Flags',
      type: 'string',
      default: 'g',
    },
    c_ignorePaths: {
      title: 'Ignored Paths',
      description: 'comma-separated [globs](https://github.com/isaacs/node-glob#glob-primer) that should not be searched (ex: \\*\\*/ignore-me/\\*\\*, \\*\\*/and-me/\\*\\*)',
      type: 'array',
      default: [],
      items: {
        type: 'string',
      },
    },
  },

  activate(state) {
    this.todoView = new TodoView(state.todoViewState);
    this.panel = atom.workspace.addRightPanel({
      item: this.todoView.getElement(),
      visible: false,
    });

    this.subscriptions = new CompositeDisposable;

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'todo:toggle': this.toggle.bind(this),
      })
    );

    return atom.emitter.on('todo:refresh', this.loadItems.bind(this));
  },

  deactivate() {
    this.panel.destroy();
    this.subscriptions.dispose();
    return this.todoView.destroy();
  },

  serialize() {
    return {
      todoViewState: this.todoView.serialize(),
    };
  },

  toggle() {
    if (this.panel.isVisible()) {
      return this.panel.hide();
    } else {
      return this.loadItems().then(() => {
        this.panel.show();
        atom.emitter.emit('todo:show');
      });
    }
  },

  loadItems() {
    return this.getItems().then(this.todoView.renderItems);
  },

  getItems() {
    return service.findTodoItems();
  },
};

export default Todo;
