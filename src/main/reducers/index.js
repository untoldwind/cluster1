import {combineReducers} from 'redux';
import directories from './directories';

const rootReducer = combineReducers({directories: directories});

export default rootReducer;
