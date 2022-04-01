import { AnyAction } from 'redux';
import { types } from './actions';
import { ITodo } from '../../types/todo';
import { IDLE, LOADING, SUCCESS, FAILED } from '../../constants/status';
export interface ITodoState {
  loadingStatus: string;
  updateStatus: string;
  deleteStatus: string;
  errorMessage: string;
  todos: ITodo[];
}

export const initialState: ITodoState = {
  loadingStatus: IDLE,
  updateStatus: IDLE,
  deleteStatus: IDLE,
  errorMessage: '',
  todos: [],
};

export default function todoReducer(
  state: ITodoState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case types.LOAD_TODO_LIST_START:
      return {
        ...state,
        loadingStatus: LOADING,
      };
    case types.LOAD_TODO_LIST_SUCCESS:
      return {
        ...state,
        loadingStatus: SUCCESS,
        todos: action.payload.todos,
      };
    case types.LOAD_TODO_LIST_FAILED:
      return {
        ...state,
        loadingStatus: FAILED,
        errorMessage: action.payload.errorMessage,
      };
    case types.TOGGLE_TODO_START:
      return {
        ...state,
        updateStatus: LOADING,
      };
    case types.TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        updateStatus: SUCCESS,
      };
    case types.TOGGLE_TODO_FAILED:
      return {
        ...state,
        updateStatus: FAILED,
        errorMessage: action.payload.errorMessage,
      };
    case types.DELETE_TODO_START:
      return {
        ...state,
        deleteStatus: LOADING,
      };
    case types.DELETE_TODO_SUCCESS:
      return {
        ...state,
        deleteStatus: SUCCESS,
      };
    case types.DELETE_TODO_FAILED:
      return {
        ...state,
        deleteStatus: FAILED,
        errorMessage: action.payload.errorMessage,
      };
    case types.TODO_LIST_RESET:
      return initialState;
    default:
      return state;
  }
}
