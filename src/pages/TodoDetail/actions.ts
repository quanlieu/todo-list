import { ITodoPost, ITodoPatch, ITodo } from '../../types/todo';

export const types = {
  CREATE_NEW_TODO_START: 'CREATE_NEW_TODO_START',
  CREATE_NEW_TODO_SUCCESS: 'CREATE_NEW_TODO_SUCCESS',
  CREATE_NEW_TODO_FAILED: 'CREATE_NEW_TODO_FAILED',
  LOAD_TODO_START: 'LOAD_TODO_START',
  LOAD_TODO_SUCCESS: 'LOAD_TODO_SUCCESS',
  LOAD_TODO_FAILED: 'LOAD_TODO_FAILED',
  UPDATE_TODO_START: 'UPDATE_TODO_START',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_FAILED: 'UPDATE_TODO_FAILED',
  TODO_DETAIL_RESET: 'TODO_DETAIL_RESET',
};

export const actions = {
  createNewTodoStart: (payload: ITodoPost) => ({
    type: types.CREATE_NEW_TODO_START,
    payload,
  }),
  createNewTodoSuccess: () => ({
    type: types.CREATE_NEW_TODO_SUCCESS,
  }),
  createNewTodoFailed: (payload: object) => ({
    type: types.CREATE_NEW_TODO_FAILED,
    payload,
  }),
  loadTodoStart: (payload: { uuid: string }) => ({
    type: types.LOAD_TODO_START,
    payload,
  }),
  loadTodoSuccess: (payload: { todo: ITodo }) => ({
    type: types.LOAD_TODO_SUCCESS,
    payload,
  }),
  loadTodoFailed: (payload: object) => ({
    type: types.LOAD_TODO_FAILED,
    payload,
  }),
  updateTodoStart: (payload: ITodoPatch) => ({
    type: types.UPDATE_TODO_START,
    payload,
  }),
  updateTodoSuccess: () => ({
    type: types.UPDATE_TODO_SUCCESS,
  }),
  updateTodoFailed: (payload: object) => ({
    type: types.UPDATE_TODO_FAILED,
    payload,
  }),
  todoDetailReset: () => ({
    type: types.TODO_DETAIL_RESET,
  }),
};
