import {createAction, createActions} from 'redux-actions';

export const SET_CURRENT_DIRECTORY = 'SET_CURRENT_DIRECTORY';

export const {setCurrentDirectory} = createActions({
  SET_CURRENT_DIRECTORY: (directoryId, files) => ({directoryId, files})
});
