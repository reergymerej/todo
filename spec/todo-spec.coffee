Todo = require '../lib/todo'
helper = require './helper'

describe "Todo", ->
  [workspaceElement, activationPromise, todoElement] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('todo')
    helper.createFile 'foo/bar/foo.txt', []

  afterEach ->
    helper.removeFiles()

  describe "when the todo:toggle event is triggered", ->

    it "hides and shows the view", ->
      jasmine.attachToDOM(workspaceElement)
      atom.commands.dispatch workspaceElement, 'todo:toggle'

      waitsForPromise ->
        Promise.all([
          activationPromise,

          # additional promise so we can wait for the search to complete
          # TODO: find an elegant way to wait for the element to show up
          new Promise((resolve) ->
            atom.emitter.on 'todo:show', resolve
          )
        ]).then(() ->
          todoElement = workspaceElement.querySelector('todo')
        )

      runs ->
        expect(todoElement).toBeVisible()

        atom.commands.dispatch workspaceElement, 'todo:toggle'
        expect(todoElement).not.toBeVisible()
