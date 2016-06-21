'use babel';

export default {
  count: 0,

  findTodoItems() {
    var flags, iterator, notIgnoredPaths, options, pattern, regex, results;
    results = [];
    iterator = function(result) {
      result.relativePath = atom.project.relativizePath(result.filePath)[1];
      return results.push(result);
    };

    // TODOs: find multiline comments
    // like this one.

    /*
    * TODOs: find
    * these too
    */

    // TODOs: update results as the documents change, debounce for performance
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

    return new Promise(resolve => {
      return atom.workspace.scan(regex, options, iterator)
      .then(() => {
        return results.sort(function(a, b) {
          return a.filePath.localeCompare(b.filePath);
        });
      })
      .then(resolve);
    });
  },
};
