import {scanDir} from './dir';

describe('directory utils', () => {
    it('should scan entire tree', () => {
        return scanDir('./src/fixtures').then(res => {
            expect(res).toEqual([
                {
                    id: '_root_/dirA',
                    parent: '_root_',
                    name: 'dirA',
                    filename: '/home/bjunglas/workspaces/o1/cluster1/src/fixtures/dirA'
                }, {
                    id: '_root_/dirA/dirAA',
                    parent: '_root_/dirA',
                    name: 'dirAA',
                    filename: '/home/bjunglas/workspaces/o1/cluster1/src/fixtures/dirA/dirAA'
                }, {
                    id: '_root_/dirB',
                    parent: '_root_',
                    name: 'dirB',
                    filename: '/home/bjunglas/workspaces/o1/cluster1/src/fixtures/dirB'
                }
            ]);
        });
    });
});
