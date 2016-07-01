'use babel';

import chai, {expect} from 'chai';
import service from '../lib/service';

chai.should();

describe('service', () => {
  it('should convert results into a tree data format', () => {
    const input = [{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/components/Container.js","matches":[{"matchText":"TODO: in /lib/components/Container","lineText":"// TODO: in /lib/components/Container","lineTextOffset":0,"range":[[2,3],[2,37]]}],"relativePath":"lib/components/Container.js"},{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/components/Controls.js","matches":[{"matchText":"TODO: in /lib/components/Controls.js","lineText":"// TODO: in /lib/components/Controls.js","lineTextOffset":0,"range":[[2,3],[2,39]]}],"relativePath":"lib/components/Controls.js"},{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/service.js","matches":[{"matchText":"TODO: in /lib/service.js","lineText":"// TODO: in /lib/service.js","lineTextOffset":0,"range":[[2,3],[2,27]]}],"relativePath":"lib/service.js"},{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/todo.js","matches":[{"matchText":"TODO: in /lib/todo.js","lineText":"// TODO: in /lib/todo.js","lineTextOffset":0,"range":[[2,3],[2,24]]},{"matchText":"TODO: Do our react rendering here","lineText":"    // TODO: Do our react rendering here","lineTextOffset":0,"range":[[39,7],[39,40]]}],"relativePath":"lib/todo.js"}]; // eslint-disable-line
    const output = service.getTreeFormat(input);
    const expected = {"path":"/","nodes":[{"path":"lib","text":"lib","icon":"icon-file-directory","nodes":[{"path":"components","text":"components","icon":"icon-file-directory","nodes":[{"path":"Container.js","text":"Container.js","icon":"icon-file-text","nodes":[{"path":"0","text":"TODO: in /lib/components/Container","nodes":[],"data":{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/components/Container.js","range":[[2,3],[2,37]]}}]},{"path":"Controls.js","text":"Controls.js","icon":"icon-file-text","nodes":[{"path":"0","text":"TODO: in /lib/components/Controls.js","nodes":[],"data":{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/components/Controls.js","range":[[2,3],[2,39]]}}]}]},{"path":"service.js","text":"service.js","icon":"icon-file-text","nodes":[{"path":"0","text":"TODO: in /lib/service.js","nodes":[],"data":{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/service.js","range":[[2,3],[2,27]]}}]},{"path":"todo.js","text":"todo.js","icon":"icon-file-text","nodes":[{"path":"0","text":"TODO: in /lib/todo.js","nodes":[],"data":{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/todo.js","range":[[2,3],[2,24]]}},{"path":"1","text":"TODO: Do our react rendering here","nodes":[],"data":{"filePath":"/Users/jeremy.greer/code/personal/todo/lib/todo.js","range":[[39,7],[39,40]]}}]}]}]}; //eslint-disable-line

    expect(output).to.eql(expected);
  });

  it('should put directories before files', () => {
    const input = [
      {
        filePath: '/fileInRoot.js',
        matches: [],
        relativePath: 'fileInRoot.js',
      },

      {
        filePath: '/foo/fileInDir.js',
        matches: [],
        relativePath: 'foo/fileInDir.js',
      },
    ];

    const expected = {
      path: '/',
      nodes: [
        {
          path: 'foo',
          text: 'foo',
          icon: 'icon-file-directory',
          nodes: [
            {
              path: 'fileInDir.js',
              text: 'fileInDir.js',
              icon: 'icon-file-text',
              nodes: [],
            },
          ],
        },
        {
          path: 'fileInRoot.js',
          text: 'fileInRoot.js',
          icon: 'icon-file-text',
          nodes: [],
        },
      ],
    };

    const output = service.getTreeFormat(input);
    expect(output).to.eql(expected);
  });
});
