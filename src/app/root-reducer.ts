import { combineReducers } from 'redux';
import todo from '../pages/TodoTable/reducers';

const rootReducer = combineReducers({ todo });

export default rootReducer;
