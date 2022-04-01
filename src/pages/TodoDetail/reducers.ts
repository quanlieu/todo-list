import { AnyAction } from 'redux';
import { types } from './actions';
import { IDLE, LOADING, SUCCESS, FAILED } from '../../constants/status';
import { ITodo } from '../../types/todo';

export interface ITodoDetailState {
  createUpdateStatus: string;
  loadingStatus: string;
  errorMessage: string;
  todo?: ITodo;
}

export const initialState: ITodoDetailState = {
  createUpdateStatus: IDLE,
  loadingStatus: IDLE,
  errorMessage: '',
  todo: undefined,
};

export default function todoDetailReducer(
  state: ITodoDetailState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case types.CREATE_NEW_TODO_START:
    case types.UPDATE_TODO_START:
      return {
        ...state,
        payload: action.payload,
        createUpdateStatus: LOADING,
      };
    case types.CREATE_NEW_TODO_SUCCESS:
    case types.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        createUpdateStatus: SUCCESS,
      };
    case types.CREATE_NEW_TODO_FAILED:
    case types.UPDATE_TODO_FAILED:
      return {
        ...state,
        createUpdateStatus: FAILED,
        errorMessage: action.payload.errorMessage,
      };
    case types.LOAD_TODO_START:
      return {
        ...state,
        loadingStatus: LOADING,
      };
    case types.LOAD_TODO_SUCCESS:
      return {
        ...state,
        todo: action.payload.todo,
        loadingStatus: SUCCESS,
      };
    case types.LOAD_TODO_FAILED:
      return {
        ...state,
        loadingStatus: FAILED,
        errorMessage: action.payload.errorMessage,
      };
    case types.TODO_DETAIL_RESET:
      return initialState;
    default:
      return state;
  }
}
