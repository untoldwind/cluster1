import fs from './fs';
import path from 'path';

export async function scanDir(dir, parent = '_root_') {
  const abs_dir = path.resolve(dir);
  const files = await fs.readdir(abs_dir);
  let result = [];

  for(const file of files) { // There is an issue with async function and array map/forEach
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

const imageExtension = ['.jpg', '.jpeg', '.gif', '.png'];

export async function imageFiles(dir) {
  const abs_dir = path.resolve(dir);
  const files = await fs.readdir(abs_dir);

  let result = [];

  for(const file of files) {
    const extname = path.extname(file).toLowerCase();
    const abs_file = path.resolve(abs_dir, file);
    const stat = await fs.stat(abs_file);

    if(stat.isFile() && imageExtension.indexOf(extname) >= 0) {
      result.push({
        name: file,
        filename: abs_file
      })
    }
  }

  return result;
}
