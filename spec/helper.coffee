path = require 'path'
fs = require 'fs'
mkdirp = require 'mkdirp'


createdFiles = []

module.exports =

  # todos[] { row, column, text }
  createFile: (filePath, todos) ->

    filePath = path.join __dirname, filePath

    # TODO: create dirs
    dirname = path.dirname filePath

    mkdirp dirname, (err) ->
      if err
        throw err

      # TODO: generate dummy content, insert todos
      fs.writeFileSync filePath, 'dummy content'
      createdFiles.push filePath

  removeFiles: () ->
    # TODO: remove created dirs
    fs.unlink file for file in createdFiles
