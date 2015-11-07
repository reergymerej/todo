module.exports =
  count: 0

  findTodoItems: () ->
    results = []

    iterator = (result) ->
      results.push result

    # TODO: make the regex match multiple lines
    # TODO: skip node_modules and others (make configurable)

    pattern = atom.config.get('todo.pattern')
    flags = atom.config.get('todo.flags')
    regex = new RegExp pattern, flags

    return atom.workspace.scan(regex, iterator).then(() ->
      return results
    )
