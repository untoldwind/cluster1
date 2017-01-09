import {scanDir} from './dir';

describe('directory utils', () => {
  it('should scan entire tree', () => {
    return scanDir('./src/fixtures').then(res => {
      console.log(res);
    });
  });
});
