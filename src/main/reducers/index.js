import {combineReducers} from 'redux';
import directories from './directories';

const rootReducer = combineReducers({directories: directories, blub: null});

export default rootReducer;
