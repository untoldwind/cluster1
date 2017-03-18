import {scanDir} from './dir';

describe('directory utils', () => {
    it('should scan entire tree', () => {
        return scanDir('./src/fixtures').then(res => {
            expect(res).toEqual([
                {
                    id: 'fsKcu+86gVtrSecn/ExiWwNTWcVNPMP+K5Ut26xaj8Q=',
                    parent: '_root_',
                    name: 'dirA',
                    filename: '/home/bjunglas/workspaces/o1/cluster1/src/fixtures/dirA'
                }, {
                    id: 'dxABOFzVe7vsz+bYDfG9EjYggukwjZ8Lei1P2mzbN1Q=',
                    parent: 'fsKcu+86gVtrSecn/ExiWwNTWcVNPMP+K5Ut26xaj8Q=',
                    name: 'dirAA',
                    filename: '/home/bjunglas/workspaces/o1/cluster1/src/fixtures/dirA/dirAA'
                }, {
                    id: 'MVmXBks7VUWPih+Lm0At5ryQESQl7gMLTiWKr6LudAI=',
                    parent: '_root_',
                    name: 'dirB',
                    filename: '/home/bjunglas/workspaces/o1/cluster1/src/fixtures/dirB'
                }
            ]);
        });
    });
});
