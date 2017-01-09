export const OPEN_DIRECTORY = 'OPEN_DIRECTORY';
export const ADD_DIRECTORY = 'ADD_DIRECTORY';
export const REMOVE_DIRECTORY = 'REMOVE_DIRECTORY';

export function openDirectory(filename) {
  return {
    type: OPEN_DIRECTORY,
    filename
  }
}

export function addDirectory(id, parent, name, filename) {
  return {
    type: ADD_DIRECTORY,
    id,
    parent,
    name,
    filename
  }
}

export function removeDirectory(id) {
  return {
    type: REMOVE_DIRECTORY,
    id
  }
}
