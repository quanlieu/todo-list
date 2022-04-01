import { combineReducers } from 'redux';
import todo from '../pages/TodoTable/reducers';
import todoDetail from '../pages/TodoDetail/reducers';
import toast from '../containers/Toast/reducers';

const rootReducer = combineReducers({ todo, todoDetail, toast });

export default rootReducer;
