module.exports =
  count: 0

  findTodoItems: () ->
    results = []

    iterator = (result) ->
      results.push result

    pattern = atom.config.get('todo.a_pattern')
    flags = atom.config.get('todo.b_flagss')
    regex = new RegExp pattern, flags
    notIgnoredPaths = atom.config.get('todo.c_ignorePaths').map((path) -> '!' + path)

    options =
      paths: if notIgnoredPaths.length then notIgnoredPaths else ['*']
      onPathsSearched: (count) -> {
        # TODO: hook in to show some type of search status in the view
      }

    return atom.workspace.scan(regex, options, iterator).then(() ->
      # sort by filename to ensure order doesn't change when refreshing
      return results.sort((a, b) -> a.filePath.localeCompare b.filePath)
    )
