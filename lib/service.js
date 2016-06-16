'use babel';

export default {
  count: 0,

  findTodoItems() {
    var flags, iterator, notIgnoredPaths, options, pattern, regex, results;
    results = [];
    iterator = function(result) {
      return results.push(result);
    };

    pattern = atom.config.get('todo.a_pattern');
    flags = atom.config.get('todo.b_flags');
    regex = new RegExp(pattern, flags);
    notIgnoredPaths = atom.config.get('todo.c_ignorePaths').map(function(path) {
      return '!' + path;
    });

    options = {
      paths: notIgnoredPaths.length ? notIgnoredPaths : ['*'],
      onPathsSearched: function(count) {
        return {};
      }
    };

    return atom.workspace.scan(regex, options, iterator).then(function() {
      return results.sort(function(a, b) {
        return a.filePath.localeCompare(b.filePath);
      });
    });
  },
};
