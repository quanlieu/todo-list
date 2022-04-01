import { ITodo } from "../../types/todo";

export const types = {
  LOAD_TODO_LIST_START: 'LOAD_TODO_LIST_START',
  LOAD_TODO_LIST_SUCCESS: 'LOAD_TODO_LIST_SUCCESS',
  LOAD_TODO_LIST_FAILED: 'LOAD_TODO_LIST_FAILED',
  TODO_LIST_RESET: 'TODO_LIST_RESET',
  DONE_TODO_START: 'DONE_TODO_START',
  DONE_TODO_SUCCESS: 'DONE_TODO_SUCCESS',
  DONE_TODO_FAILED: 'DONE_TODO_FAILED',
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
  doneTodoStart: (payload: { id: string }) => ({
    type: types.DONE_TODO_START,
    payload,
  }),
  doneTodoSuccess: () => ({
    type: types.DONE_TODO_SUCCESS,
  }),
  doneTodoFailed: (payload: object) => ({
    type: types.DONE_TODO_FAILED,
  }),
  deleteTodoStart: (payload: { id: string }) => ({
    type: types.DELETE_TODO_START,
    payload,
  }),
  deleteTodoSuccess: () => ({
    type: types.DELETE_TODO_SUCCESS,
  }),
  deleteTodoFailed: (payload: object) => ({
    type: types.DELETE_TODO_FAILED,
  }),
};
