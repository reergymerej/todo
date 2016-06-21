path = require 'path'
fs = require 'fs'
mkdirp = require 'mkdirp'
NEWLINE = require('os').EOL

createdFiles = []

# TODOS: split this out into its own node module
module.exports =

  # todos[] { row, column, text }
  createFile: (filePath, todos) ->

    filePath = path.join __dirname, filePath
    dirname = path.dirname filePath

    mkdirp dirname, (err) =>
      if err
        throw err

      # TODOS: generate dummy content, insert todos
      fs.writeFileSync filePath, @getDummyContent(todos)
      createdFiles.push filePath

  removeFiles: () ->
    # TODOS: remove created dirs
    fs.unlinkSync file for file in createdFiles

  getDummyContent: (todos) ->

    content = ''

    for todo in todos
      rows = content.split NEWLINE

      # put in on the line
      while rows.length <= todo.row
        rows.push ''

      todoRow = rows[todo.row]
      while todoRow.length < todo.column
        todoRow += ' '

      rows[todo.row] = todoRow.slice(0, todo.column) + todo.text + todoRow.slice(todo.column + 1)

      content = rows.join NEWLINE

    return content
