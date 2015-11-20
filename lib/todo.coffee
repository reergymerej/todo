service = require './service'
TodoView = require './todo-view'
{CompositeDisposable} = require 'atom'

module.exports = Todo =
  todoView: null
  panel: null
  subscriptions: null

  config:
    pattern:
      type: 'string'
      default: 'TODO\\:.+'
    flags:
      type: 'string'
      default: 'g'
    ignorePaths:
      type: 'array'
      default: []
      items:
        type: 'string'

  # TODO: refactor all of this so it's not so silly

  activate: (state) ->
    @todoView = new TodoView(state.todoViewState)
    @panel = atom.workspace.addRightPanel(item: @todoView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'todo:toggle': => @toggle()

    # TODO: don't use the global events, just add a listener to the view
    atom.emitter.on 'todo:refresh', @loadItems.bind this

  deactivate: ->
    @panel.destroy()
    @subscriptions.dispose()
    @todoView.destroy()

  serialize: ->
    todoViewState: @todoView.serialize()

  toggle: ->
    if @panel.isVisible()
      @panel.hide()
    else
      return @loadItems().then(() =>
        @panel.show()
        atom.emitter.emit 'todo:show'
      )

  loadItems: () ->
    @getItems().then((items) =>
      @todoView.renderItems(items)
    )

  getItems: () -> service.findTodoItems()
