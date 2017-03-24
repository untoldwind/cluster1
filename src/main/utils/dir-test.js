import {scanDir, imageFiles} from './dir';

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

    it('should find images in directory', () => {
      return imageFiles('./src/fixtures/dirA').then(res => {
        expect(res).toEqual([{
          filename: "/home/bjunglas/workspaces/o1/cluster1/src/fixtures/dirA/pexels-photo-239898.jpeg",
          name: "pexels-photo-239898.jpeg"
        }]);
      });
    });
});
