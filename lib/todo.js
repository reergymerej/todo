// 'use babel';

var CompositeDisposable, Todo, TodoView, service;

service = require('./service');

TodoView = require('./todo-view');

CompositeDisposable = require('atom').CompositeDisposable;

module.exports = Todo = {
  todoView: null,
  panel: null,
  subscriptions: null,
  config: {
    a_pattern: {
      title: 'RegExp Pattern',
      description: 'used in conjunction with RegExp Flags to find todo items in your code',
      type: 'string',
      "default": 'TODO\\:.+'
    },
    b_flags: {
      title: 'RegExp Flags',
      type: 'string',
      "default": 'g'
    },
    c_ignorePaths: {
      title: 'Ignored Paths',
      description: 'comma-separated [globs](https://github.com/isaacs/node-glob#glob-primer) that should not be searched (ex: \\*\\*/ignore-me/\\*\\*, \\*\\*/and-me/\\*\\*)',
      type: 'array',
      "default": [],
      items: {
        type: 'string'
      }
    }
  },
  activate: function(state) {
    this.todoView = new TodoView(state.todoViewState);
    this.panel = atom.workspace.addRightPanel({
      item: this.todoView.getElement(),
      visible: false
    });
    this.subscriptions = new CompositeDisposable;
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'todo:toggle': (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this)
    }));
    return atom.emitter.on('todo:refresh', this.loadItems.bind(this));
  },
  deactivate: function() {
    this.panel.destroy();
    this.subscriptions.dispose();
    return this.todoView.destroy();
  },
  serialize: function() {
    return {
      todoViewState: this.todoView.serialize()
    };
  },
  toggle: function() {
    if (this.panel.isVisible()) {
      return this.panel.hide();
    } else {
      return this.loadItems().then((function(_this) {
        return function() {
          _this.panel.show();
          return atom.emitter.emit('todo:show');
        };
      })(this));
    }
  },
  loadItems: function() {
    return this.getItems().then((function(_this) {
      return function(items) {
        return _this.todoView.renderItems(items);
      };
    })(this));
  },
  getItems: function() {
    return service.findTodoItems();
  }
};
