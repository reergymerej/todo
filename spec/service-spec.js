'use babel';

import chai, {expect} from 'chai';
import service from '../lib/service';

chai.should();

xdescribe('service', () => {
  it('should convert results into a tree data format', () => {
    const input = [{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/components/Container.js","matches":[{"matchText":"TODO: in /lib/components/Container","lineText":"// TODO: in /lib/components/Container","lineTextOffset":0,"range":[[2,3],[2,37]]}],"relativePath":"lib/components/Container.js"},{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/components/Controls.js","matches":[{"matchText":"TODO: in /lib/components/Controls.js","lineText":"// TODO: in /lib/components/Controls.js","lineTextOffset":0,"range":[[2,3],[2,39]]}],"relativePath":"lib/components/Controls.js"},{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/service.js","matches":[{"matchText":"TODO: in /lib/service.js","lineText":"// TODO: in /lib/service.js","lineTextOffset":0,"range":[[2,3],[2,27]]}],"relativePath":"lib/service.js"},{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/todo.js","matches":[{"matchText":"TODO: in /lib/todo.js","lineText":"// TODO: in /lib/todo.js","lineTextOffset":0,"range":[[2,3],[2,24]]},{"matchText":"TODO: Do our react rendering here","lineText":"    // TODO: Do our react rendering here","lineTextOffset":0,"range":[[39,7],[39,40]]}],"relativePath":"lib/todo.js"}]; // eslint-disable-line
    const output = service.getTreeFormat(input);
    const expected = {
      path: '/',
      nodes: [
        {
          path: 'lib',
          text: 'lib',
          icon: 'icon-file-directory',
          nodes: [
            {
              path: 'components',
              text: 'components',
              icon: 'icon-file-directory',
              nodes: [
                {
                  path: 'Container.js',
                  text: 'Container.js',
                  icon: 'icon-file-text',
                  nodes: [],
                },

                {
                  path: 'Controls.js',
                  text: 'Controls.js',
                  icon: 'icon-file-text',
                  nodes: [],
                },
              ],
            },

            {
              path: 'service.js',
              text: 'service.js',
              icon: 'icon-file-text',
              nodes: [],
            },

            {
              path: 'todo.js',
              text: 'todo.js',
              icon: 'icon-file-text',
              nodes: [],
            },
          ],
        },
      ],
    };
    expect(output).to.eql(expected);
  });
});
