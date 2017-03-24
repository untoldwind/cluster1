import {combineReducers} from 'redux';
import directories from './directories';
import currentDirectory from './current_directory';

const rootReducer = combineReducers({
  directories: directories,
  currentDirectory: currentDirectory
});

export default rootReducer;
