import { ITodo } from '../../types/todo';

export const types = {
  LOAD_TODO_LIST_START: 'LOAD_TODO_LIST_START',
  LOAD_TODO_LIST_SUCCESS: 'LOAD_TODO_LIST_SUCCESS',
  LOAD_TODO_LIST_FAILED: 'LOAD_TODO_LIST_FAILED',
  TODO_LIST_RESET: 'TODO_LIST_RESET',
  TOGGLE_TODO_START: 'TOGGLE_TODO_START',
  TOGGLE_TODO_SUCCESS: 'TOGGLE_TODO_SUCCESS',
  TOGGLE_TODO_FAILED: 'TOGGLE_TODO_FAILED',
  DELETE_TODO_START: 'DELETE_TODO_START',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',
  DELETE_TODO_FAILED: 'DELETE_TODO_FAILED',
};

export const actions = {
  getTodoListStart: () => ({
    type: types.LOAD_TODO_LIST_START,
  }),
  getTodoListSuccess: (payload: { todos: ITodo[] }) => ({
    type: types.LOAD_TODO_LIST_SUCCESS,
    payload,
  }),
  getTodoListFailed: (payload: object) => ({
    type: types.LOAD_TODO_LIST_FAILED,
    payload,
  }),
  todoReset: () => ({
    type: types.TODO_LIST_RESET,
  }),
  toggleTodoStart: (payload: ITodo) => ({
    type: types.TOGGLE_TODO_START,
    payload,
  }),
  toggleTodoSuccess: () => ({
    type: types.TOGGLE_TODO_SUCCESS,
  }),
  toggleTodoFailed: (payload: object) => ({
    type: types.TOGGLE_TODO_FAILED,
    payload,
  }),
  deleteTodoStart: (payload: { uuid: string }) => ({
    type: types.DELETE_TODO_START,
    payload,
  }),
  deleteTodoSuccess: () => ({
    type: types.DELETE_TODO_SUCCESS,
  }),
  deleteTodoFailed: (payload: object) => ({
    type: types.DELETE_TODO_FAILED,
    payload,
  }),
};
