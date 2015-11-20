module.exports =
  count: 0

  findTodoItems: () ->
    results = []

    iterator = (result) ->
      results.push result

    # TODO: make the regex match multiple lines

    pattern = atom.config.get('todo.pattern')
    flags = atom.config.get('todo.flags')
    regex = new RegExp pattern, flags
    notIgnoredPaths = atom.config.get('todo.ignorePaths').map((path) -> '!' + path)

    options =
      paths: if notIgnoredPaths.length then notIgnoredPaths else ['*']
      onPathsSearched: (count) -> {
        # TODO: hook in to show some type of search status in the view
      }

    return atom.workspace.scan(regex, options, iterator).then(() ->
      # sort by filename to ensure order doesn't change when refreshing
      return results.sort((a, b) -> a.filePath.localeCompare b.filePath)
    )
