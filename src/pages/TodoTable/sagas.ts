import { call, put, takeEvery } from 'redux-saga/effects';
import { ITodo } from '../../types/todo';
import { types, actions } from './actions';
import * as todosApi from '../../apis/todos';
import {
  actions as toastActions,
  VARIANT,
} from '../../containers/Toast/actions';

export function* getTodoList() {
  try {
    const response: { data: ITodo[] } = yield call(todosApi.getTodos);
    yield put(actions.getTodoListSuccess({ todos: response.data }));
  } catch (error: any) {
    yield put(
      actions.getTodoListFailed({
        errorMessage: error?.response?.data?.message || 'Error',
      })
    );
  }
}

export function* toggleTodo(
  action: ReturnType<typeof actions.toggleTodoStart>
) {
  try {
    const { uuid, done } = action.payload;
    yield call(todosApi.patchTodo, { uuid, done: !done });
    yield put(actions.toggleTodoSuccess());
    yield put(actions.getTodoListStart());
    yield put(
      toastActions.showToast({
        header: 'Success',
        body: `Todo set to ${!done ? 'done' : 'undone'} success`,
        variant: VARIANT.LIGHT,
      })
    );
  } catch (error: any) {
    yield put(
      actions.toggleTodoFailed({
        errorMessage: error?.response?.data?.message || 'Error',
      })
    );
    yield put(
      toastActions.showToast({
        header: 'Error',
        body: error?.response?.data?.message || 'Error',
        variant: VARIANT.DANGER,
      })
    );
  }
}

export function* deleteTodo(
  action: ReturnType<typeof actions.deleteTodoStart>
) {
  try {
    yield call(todosApi.deleteTodo, action.payload.uuid);
    yield put(actions.deleteTodoSuccess());
    yield put(actions.getTodoListStart());
    yield put(
      toastActions.showToast({
        header: 'Success',
        body: 'Delete todo success',
        variant: VARIANT.LIGHT,
      })
    );
  } catch (error: any) {
    yield put(
      actions.deleteTodoFailed({
        errorMessage: error?.response?.data?.message || 'Error',
      })
    );
    yield put(
      toastActions.showToast({
        header: 'Error',
        body: error?.response?.data?.message || 'Error',
        variant: VARIANT.DANGER,
      })
    );
  }
}

const TodoSaga = [
  takeEvery(types.LOAD_TODO_LIST_START, getTodoList),
  takeEvery(types.TOGGLE_TODO_START, toggleTodo),
  takeEvery(types.DELETE_TODO_START, deleteTodo),
];

export default TodoSaga;
