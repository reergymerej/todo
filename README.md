# todo

a package for finding TODO statements in your Atom project

![A screenshot of your package](https://raw.githubusercontent.com/reergymerej/todo/master/resources/todo-preview.png)

Use <kbd>ctrl-k ctrl-t</kbd> to toggle a list of the **TODO** items
in your project.  Click the item to jump to the source.


## config

.gitignore directories are ignored.  To ignore additional directories, add them to `ignorePaths` config.

<!-- TODO: document these config options  -->
<!-- TODO: figure out how other packages do config  -->
pattern - regex used to find **TODO**  items  
flags - 2nd param for RegExp construction  
ignorePaths - see [scan](https://atom.io/docs/api/v1.1.0/Workspace#instance-scan)
