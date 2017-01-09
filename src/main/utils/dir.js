import fs from './fs';
import path from 'path';
import crypto from 'crypto'

function mkId(filename) {
  return crypto.createHash('sha256').update(filename).digest('base64');
}

export async function scanDir(dir, parent = '_root_') {
  const abs_dir = path.resolve(dir);
  const files = await fs.readdir(abs_dir);
  let result = [];

  for(const file of files) {
    const abs_file = path.resolve(abs_dir, file);
    const stat = await fs.stat(abs_file);

    if(stat.isDirectory()) {
      const id = mkId(abs_file);
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
