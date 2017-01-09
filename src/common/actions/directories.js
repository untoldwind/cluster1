import {createAction, createActions} from 'redux-actions';

export const ADD_DIRECTORY = 'ADD_DIRECTORY';
export const REMOVE_DIRECTORY = 'REMOVE_DIRECTORY';

export const addDirectories = createAction('ADD_DIRECTORY');
export const {addDirectory, removeDirectory} = createActions({
  ADD_DIRECTORY: (id, parent, name, filename) => ([{id, parent, name, filename}]),
  REMOVE_DIRECTORY: id => id
});
