'use babel';

export default {
  count: 0,

  findTodoItems() {
    var flags, notIgnoredPaths, options, pattern, regex, results;
    results = [];

    function iterator(result) {
      result.relativePath = atom.project.relativizePath(result.filePath)[1];
      return results.push(result);
    }

    // TODO: find multiline comments
    // like this one.

    /*
    * TODO: find comments like
    * these too
    */

    // TODO: update results as the documents change, debounce for performance
    pattern = atom.config.get('todo.a_pattern');
    flags = atom.config.get('todo.b_flags');
    regex = new RegExp(pattern, flags);
    notIgnoredPaths = atom.config.get('todo.c_ignorePaths').map(function(path) {
      return '!' + path;
    });

    options = {
      // TODO: make this clearer
      paths: notIgnoredPaths.length ? notIgnoredPaths : ['*'],
      // TODO: restore this after working with slow searches
      // paths: [
      //   '*',
      //   'node_modules/',
      // ],
      onPathsSearched: function (count) {
        return atom.emitter.emit('todo:pathSearched', count);
      },
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
