import { combineReducers } from 'redux';
import todo from '../pages/TodoTable/reducers';
import toast from '../containers/Toast/reducers';

const rootReducer = combineReducers({ todo, toast });

export default rootReducer;
