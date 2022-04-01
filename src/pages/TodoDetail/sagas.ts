import { call, put, takeEvery } from 'redux-saga/effects';
import * as todosApi from '../../apis/todos';
import { types, actions } from './actions';
import {
  actions as toastActions,
  VARIANT,
} from '../../containers/Toast/actions';
import { ITodo } from '../../types/todo';

export function* getTodo(action: ReturnType<typeof actions.loadTodoStart>) {
  try {
    const response: { data: ITodo } = yield call(
      todosApi.getTodo,
      action.payload.uuid
    );
    yield put(actions.loadTodoSuccess({ todo: response.data }));
  } catch (error: any) {
    yield put(
      actions.loadTodoFailed({
        errorMessage: error?.response?.data?.message || 'Error',
      })
    );
  }
}

export function* newTodo(
  action: ReturnType<typeof actions.createNewTodoStart>
) {
  try {
    yield call(todosApi.postTodo, action.payload);
    yield put(actions.createNewTodoSuccess());
    yield put(
      toastActions.showToast({
        header: 'Success',
        body: 'Create new todo success',
        variant: VARIANT.LIGHT,
      })
    );
  } catch (error: any) {
    yield put(
      actions.createNewTodoFailed({
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

export function* updateTodo(
  action: ReturnType<typeof actions.updateTodoStart>
) {
  try {
    yield call(todosApi.patchTodo, action.payload);
    yield put(actions.updateTodoSuccess());
    yield put(
      toastActions.showToast({
        header: 'Success',
        body: 'Update todo success',
        variant: VARIANT.LIGHT,
      })
    );
  } catch (error: any) {
    yield put(
      actions.updateTodoFailed({
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

const TodoDetailSaga = [
  takeEvery(types.LOAD_TODO_START, getTodo),
  takeEvery(types.CREATE_NEW_TODO_START, newTodo),
  takeEvery(types.UPDATE_TODO_START, updateTodo),
];

export default TodoDetailSaga;
