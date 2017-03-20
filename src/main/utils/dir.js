import fs from './fs';
import path from 'path';

export async function scanDir(dir, parent = '_root_') {
  const abs_dir = path.resolve(dir);
  const files = await fs.readdir(abs_dir);
  let result = [];

  for(const file of files) {
    const abs_file = path.resolve(abs_dir, file);
    const stat = await fs.stat(abs_file);

    if(stat.isDirectory()) {
      const id = parent + '/' + file;
      result.push({
        id,
        parent: parent,
        name: file,
        filename: abs_file
      })
      result.push(...(await scanDir(abs_file, id)));
    }
  }
  return result;
}
