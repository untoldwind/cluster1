import fs from 'fs';
import thenifyAll from 'thenify-all';

export default thenifyAll(fs, {}, [
  'lstat',
  'readdir',
  'readFile',
  'stat'
]);
